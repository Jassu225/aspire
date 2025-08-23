import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import CollapsibleView from './CollapsibleView.vue';

installQuasarPlugin();

describe.concurrent('components/CollapsibleView', () => {
  it('should render', () => {
    const icon = h('span', { 'data-testid': 'test-icon' });
    const wrapper = mount(CollapsibleView, {
      props: { title: 'Test', icon },
      slots: {
        default: h('div', { 'data-testid': 'test-default-slot' }, 'Test Slot'),
        footer: h('div', { 'data-testid': 'test-footer-slot' }, 'Test Footer Slot'),
      },
    });
    expect(wrapper.find('[data-testid="title"]').text()).toBe('Test');
    expect(wrapper.props().defaultOpened).toBe(false);
    expect(wrapper.find('[data-testid="test-icon"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="test-default-slot"]').text()).toBe('Test Slot');
    expect(wrapper.find('[data-testid="test-footer-slot"]').text()).toBe('Test Footer Slot');
    wrapper.unmount();
  });

  it('should be able to update the defaultOpened prop', () => {
    const icon = h('span', { 'data-testid': 'test-icon-2' });
    const wrapper = mount(CollapsibleView, {
      props: { title: 'Test-2', icon, defaultOpened: true },
    });
    expect(wrapper.props().defaultOpened).toBe(true);
    expect(wrapper.find('[data-testid="test-icon-2"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="title"]').text()).toBe('Test-2');
    wrapper.unmount();
  });

  it('should be able to show and hide the collapsible view', async () => {
    const icon = h('span', { 'data-testid': 'test-icon-3' });
    const wrapper = mount(CollapsibleView, { props: { title: 'Test-3', icon } });
    expect(wrapper.emitted('show')).toBeFalsy();
    await wrapper.find('[data-testid="test-icon-3"]').trigger('click');
    expect(wrapper.emitted('show')).toBeTruthy();
    expect(wrapper.emitted('hide')).toBeFalsy();
    await wrapper.find('[data-testid="test-icon-3"]').trigger('click');
    expect(wrapper.emitted('hide')).toBeTruthy();
  });

  it('should be able to show and hide the collapsible view when defaultOpened is true', async () => {
    const icon = h('span', { 'data-testid': 'test-icon-4' });
    const wrapper = mount(CollapsibleView, {
      props: { title: 'Test-4', icon, defaultOpened: true },
    });
    expect(wrapper.emitted('hide')).toBeFalsy();
    await wrapper.find('[data-testid="test-icon-4"]').trigger('click');
    expect(wrapper.emitted('hide')).toBeTruthy();
    expect(wrapper.emitted('show')).toBeFalsy();
    await wrapper.find('[data-testid="test-icon-4"]').trigger('click');
    expect(wrapper.emitted('show')).toBeTruthy();
  });
});
