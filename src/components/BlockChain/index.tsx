import React, { useState } from 'react';

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
  let blockCount = 0;
  


  /**
   * Complete this function
   * onAdd should create a new block
   */
  const onAdd = () => {
    let newProps: Props = {
      block: blockCount++,
      previousHash: undefined,
      hash: "dog",
      onHash: onHash
    }
    let newBlock = <Block {...newProps} />
    updateBlocks(blockArray.concat([newBlock]))
  }

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */
  const onDelete = () => {
    
  }

  /**
   * Complete this function
   * onHash should update the corresponding index in the state 'hashes'
   * E.g., block 1 should update its corresponding index in the state 'hashes'
   */
  const onHash = (_block: number, hash: string) => {
    setHashes([hash]);
  }

  // const blockArray = [
  //   // <Block block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/>,
  //   <Block block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/>
  // ]

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
      <div>Total Blocks: 0</div>
      {blockArray}
      {/* <Block block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/> */}
      <button type="button" onClick={() => onAdd()}>Add Block</button>
    </div> 
  );
}

export default BlockChain;