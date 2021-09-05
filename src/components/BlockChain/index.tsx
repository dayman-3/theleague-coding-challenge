import React, { useEffect, useState } from 'react';

import Block, { Props } from '../Block';
// TODO if necessary, don't export and fix tsconfig.json

import styles from './styles.module.css';

/**
 * Block Chain Component
 * This component adds, delete and contains the hashes for the block chain
 * A single block is already done
 */
const BlockChain = () => {
  // Contains all hashes
  const [hashes, setHashes] = useState<string[]>([]); 
  const [blockArray, updateBlocks] = useState<JSX.Element[]>([]);
  const [blockCount, updateBlockCount] = useState<number>(0); 

  useEffect(() => {
    updateBlockCount(blockArray.length);
  })

  /**
   * Complete this function
   * onAdd should create a new block
   */
  const onAdd = () => {
    let newHash = '0'.repeat(64);
    setHashes(hashes.concat([newHash]));
    let newProps: Props = {
      block: blockCount+1,
      previousHash: (blockCount > 0 ? hashes[blockCount] : newHash), // TODO check if necessary
      hash: hashes[blockCount],
      onDelete: onDelete,
      onHash: onHash
    };
    let newBlock = <Block key={blockCount} {...newProps} />;
    updateBlocks([...blockArray, newBlock]);
    updateBlockCount(blockCount+1);
  }

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */
  const onDelete = () => {
    updateBlockCount(blockCount-1);
    updateBlocks(blockArray.slice(0, blockCount-1));
    setHashes(hashes.slice(0, blockCount-1))
  } // TODO what if one block in chain

  /**
   * Complete this function
   * onHash should update the corresponding index in the state 'hashes'
   * E.g., block 1 should update its corresponding index in the state 'hashes'
   */
  const onHash = (_block: number, hash: string) => {
    let newHashes = [...hashes];
    newHashes[_block-1] = hash;
    setHashes([...newHashes]);
  }
  
  /**
   * Fix the return statement
   * Currently we only show one block, this is incorrect.
   * We need to be able to show multiple blocks as a block chain should.
   * You'll most likely need to add more functions or states to fix the render. Figure out a way you can go about this.
   * Total Blocks is also incorrect.
   */
  return (
    <div className={styles.blockChain}>
      <h1>Block Chain Demo</h1>
      <div>Total Blocks: {blockCount}</div>
      {blockArray.map((b, i) => 
        <Block
          key={i}
          block={i+1}
          hash={hashes[i]}
          previousHash={(i > 0 ? hashes[i-1] : '0'.repeat(64))}
          onDelete={(i == blockArray.length-1 ? onDelete : null)}
          onHash={onHash}
        />
      )}
      <button type="button" onClick={() => onAdd()}>Add Block</button>
    </div> 
  );
}

export default BlockChain;