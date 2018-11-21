import React from 'react';
import { shallow } from 'enzyme';
import SearchWord from './container';

describe('MainContainer page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SearchWord
        saveWord={() => {}}
        searchWord={() => {}}
        cleanFoundWord={() => {}}
        onFillForm={() => {}}
      />
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});