import * as web3 from '@solana/web3.js'
import { Rpc } from "./rpc"
import { Command } from "commander";

const program = new Command();
program
  .version("1.0.0")
  .option("-c, --cluster  [value]", "Cluster to use")
  .description("A simple CLI for interact with a Solana node using RPC methods")

const options = program.opts();
const cluster = options.cluster ? options.cluster : 'devnet';

const rpc = new Rpc(cluster);

program
  .command('get-balance')
  .argument('<pubkey>', 'Pubkey', String)
  .action((pubkey: String) => {
    const key = new web3.PublicKey(pubkey);
    rpc.getBalance(key).then(bal => console.log('Balance:', bal))
  });

program
  .command('is-executable')
  .argument('<programId>', 'Program id', String)
  .action((pubkey: String) => {
    const key = new web3.PublicKey(pubkey);
    rpc.isExecutable(key).then(ex => console.log('Is it executable?', ex))
  });

program
  .command('get-program-accounts')
  .argument('<programId>', 'Program id', String)
  .action((pubkey: String) => {
    const key = new web3.PublicKey(pubkey);
    rpc.getProgramAccounts(key).then(accounts => console.log('Accounts', accounts))
  });

program.parse(process.argv);

