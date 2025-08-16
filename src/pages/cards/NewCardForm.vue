<template>
  <q-dialog v-model="model" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Issue new card</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          ref="new-card-form"
          @submit.prevent="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          autofocus
        >
          <q-select
            v-model="newCardFormData.type"
            :options="cardTypes"
            :display-value="enumToSentence(newCardFormData.type)"
            :option-label="enumToSentence"
            label="Select card type *"
            lazy-rules
            :rules="[requiredRule()]"
          />
          <q-select
            v-model="newCardFormData.network"
            :options="cardNetworks"
            :display-value="enumToSentence(newCardFormData.network)"
            label="Select card network *"
            lazy-rules
            :rules="[requiredRule()]"
          />
          <q-input
            filled
            v-model="newCardFormData.name"
            label="Name on the card *"
            lazy-rules
            :rules="[requiredRule(), nameRule(), maxLengthRule(MAX_CARD_NAME_LENGTH)]"
          />
          <q-select
            v-model="newCardFormData.validityInYears"
            :options="CARD_VALIDITY_RANGE_IN_YEARS"
            label="Validity (in years) *"
            lazy-rules
            :rules="[requiredRule()]"
          />

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn label="Submit" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onWatcherCleanup, reactive, toValue, useTemplateRef, watchEffect } from 'vue';
import { useQuasar, type QForm } from 'quasar';
import { CardType, CardNetwork } from 'src/types/db/card';
import { requiredRule, maxLengthRule, nameRule } from 'src/utils/form';
import { MAX_CARD_NAME_LENGTH, CARD_VALIDITY_RANGE_IN_YEARS } from 'src/utils/card';
import { enumToSentence } from 'src/utils/enum';
import type { SubmitNewCardFormRequest } from 'src/types/api/cards';
import { useFetch } from 'src/composables/useFetch';
import { submitNewCardForm } from 'src/services/api/cards';
import useCardsStore from 'src/stores/cards';

const model = defineModel<boolean>({
  default: () => false,
});

const defaultValue = (): SubmitNewCardFormRequest => ({
  type: CardType.DEBIT,
  network: CardNetwork.VISA,
  name: '',
  validityInYears: CARD_VALIDITY_RANGE_IN_YEARS[0] || 2,
});

const cardTypes = Object.values(CardType);
const cardNetworks = Object.values(CardNetwork);
const cardsStore = useCardsStore();

const newCardFormData = reactive(defaultValue());
const formRef = useTemplateRef<QForm>('new-card-form');

const onReset = () => {
  Object.assign(newCardFormData, defaultValue());
};

const $q = useQuasar();
const { isFetching, fetch } = useFetch(submitNewCardForm);

watchEffect(() => {
  if (!isFetching.value) return;
  $q.loading.show({});
  onWatcherCleanup(() => {
    $q.loading.hide();
  });
});

const onSubmit = async () => {
  if (formRef.value === null) return;
  const success = await formRef.value.validate();
  if (!success) {
    return $q.notify({
      type: 'info',
      message: 'Please resolve all the errors.',
    });
  }
  try {
    const newCard = await fetch(toValue(newCardFormData));
    cardsStore.$patch((state) => {
      state.cardsInfoResponse?.cards.push(newCard);
      state.selectedCardUid = newCard.uid;
    });
    model.value = false;
  } catch {
    /* suppress*/
  }
};
</script>
