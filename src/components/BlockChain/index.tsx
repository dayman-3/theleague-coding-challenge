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

  // let firstBlock = <Block block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/>
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
    // updateBlockCount(blockArray.length);

    let newHash = '0'.repeat(64);
    setHashes(hashes.concat([newHash]));
    let newProps: Props = {
      block: blockCount+1,
      previousHash: (blockCount > 0 ? hashes[blockCount] : newHash), // TODO check if necessary
      hash: newHash,
      onDelete: onDelete,
      // onDelete: (blockCount > 0 ? onDelete : () => {}),
      onHash: onHash
    };
    let newBlock = <Block key={blockCount} {...newProps} />;
    updateBlocks([...blockArray, newBlock]);
    updateBlockCount(blockCount+1);

    console.log("blockCount = " + blockCount)
    // console.log ("ADDED: " + blockArray.map(i =>`(${i.key}, ${i.props.block})`));
  }

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */
  const onDelete = () => {

    updateBlockCount(blockCount-1);
    updateBlocks(blockArray.splice(0, blockCount));
    setHashes(hashes.splice(0, blockCount))

    console.log("blockCount = " + blockCount)
    // console.log ("DELETED: " + blockArray.map(i =>`(${i.key}, ${i.props.block})`));
  } // TODO what if one block in chain

  /**
   * Complete this function
   * onHash should update the corresponding index in the state 'hashes'
   * E.g., block 1 should update its corresponding index in the state 'hashes'
   */
  const onHash = (_block: number, hash: string) => {
    let newHashes = [...hashes];
    newHashes[_block] = hash;
    setHashes([...newHashes]);
  }

  // const blockArray = [
  //   // <Block block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/>,
  //   <Block block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/>
  // ]

  // let firstBlock = <Block key={0} block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/>
  // blockCount = 1;
  // blockArray.push(firstBlock)
  // TODO check if it's good/bad practice to manually update the state variable
  // also done with blockCount

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
      <div>Total Blocks: {blockCount}</div> {/* TODO this off-by-one thing is a bit sketchy */}
      {/* {blockArray.map((b, i) => <div key={i}>{b}</div>)} */}
      {blockArray}
      {/* <Block block={1} hash={hashes[0]} onHash={onHash} onDelete={onDelete}/> */}
      <button type="button" onClick={() => onAdd()}>Add Block</button>
    </div> 
  );
}

export default BlockChain;