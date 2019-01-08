import React from 'react';
import { render } from 'react-testing-library';
import ReadmePanel from '../components/ReadmePanel';

describe('Readme rendering', () => {
    test('ReadmePanel with no readme supplied', () => {
        const { getByText } = render(<ReadmePanel />);
        const noReadmeHeader = getByText('This page does not seem to have a Readme!');
        expect(noReadmeHeader).toBeTruthy();
    });
    test('ReadmePanel with a mock readme supplied', () => {
        const { getByText } = render(<ReadmePanel readme={{ text: '#TestMarkdown __Test__' }} />);
        const firstHeader = getByText('TestMarkdown');
        expect(firstHeader).toBeTruthy();
    });
});
