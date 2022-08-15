import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../src/Component/Header';

it('renders correctly', () => {
    const header = renderer.create(
        <Header />
    ).toJSON();
    expect(header).toMatchSnapshot();
});