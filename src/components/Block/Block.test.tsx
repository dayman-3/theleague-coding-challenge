import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Block from './';
import BlockChain from '../BlockChain/'

/**
 * Block Testing
 * Please Complete these tests
 */

/**
 * Hash is set on load
 * We need to check that when component is rendered, 
 * onHash is called and the hash change is reflected in the component
 */
it('Hash is set on load', () => {
    const onHash = jest.fn()
    const onDelete = jest.fn()

    const blockProps = {
        block: 1,
        hash: '',
        onHash: onHash,
        onDelete: onDelete
    }

    let { getByText } = render(<div><BlockChain /><Block {...blockProps}/></div>);
    userEvent.click(getByText('Add Block'));

    expect(onHash).toHaveBeenCalledTimes(1);

    const firstHash = '3655adf12498c56fee3e3ac60a18ec0d991ca165cc1aeb22048466b98580a7e4';
    expect(getByText(firstHash)).toBeInTheDocument();
    

}); 

/**
 * Shows not valid text
 * On render, the text 'Not Valid' should be in the document as the hash is not valid
 */
it("Shows not valid text", () => {
    const onHash = jest.fn()
    const onDelete = jest.fn()
    const { getByText } = render(
        <Block
            block={1}
            hash={""}
            onHash={onHash}
            onDelete={onDelete}
        />
    )
    expect(getByText("Not Valid")).toBeInTheDocument();
});

/**
 * Delete is called correctly
 * We need to make sure that when clicking on delete, the delete function is called
 */
it("Delete is called correctly", () => {
    const onHash = jest.fn()
    const onDelete = jest.fn()
    const { getByText } = render(
        <Block
            block={1}
            hash={""}
            onHash={onHash}
            onDelete={onDelete}
        />
    )
    userEvent.click(getByText('Delete'));
    expect(onDelete).toBeCalled()
});

/**
 * Mining works correctly
 * We need to be able to click on mine and expect the block hash to now be valid
 * The text 'Valid' should also be in the document
 */
it("Mining works correctly", () => {
    const { getByText } = render(<BlockChain />);
    userEvent.click(getByText('Add Block'));
    
    // should be the same every time
    const firstHash = '3655adf12498c56fee3e3ac60a18ec0d991ca165cc1aeb22048466b98580a7e4';
    expect(getByText(firstHash)).toBeInTheDocument();
    
    userEvent.click(getByText('Mine'));

    const minedHash = '000cc48e9c48c8f5da4f4ef9cacb9814b58490e72dd478afb028f50c1631f9e8';
    expect(getByText(minedHash)).toBeInTheDocument();
    expect(getByText(/^Valid$/i)).toBeInTheDocument();
});

/**
 * Changing data effects hash
 * The data textarea can be change, 
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {   
    
    // const { getByText } = render(<Block {...blockProps}/>);
    const { getByText } = render(<BlockChain />);
    userEvent.click(getByText('Add Block'));

    // test that changing the t
    userEvent.type(screen.getByRole('textbox'), 'Testing is fun :)');
    const newHash = 'f3da60e7c3bc0fef355ba91c5e3bc51e2d57f7c39edf899419d28e0a04499a1a';
    expect(getByText(newHash)).toBeInTheDocument();
});

