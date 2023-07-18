import * as web3 from '@solana/web3.js'

export class Rpc {
  private cluster: web3.Cluster

  constructor(cluster: web3.Cluster) {
    this.cluster = cluster
  }

  public async getProgramAccounts(programId: web3.PublicKey): Promise<web3.PublicKey[]> {
    const connection = new web3.Connection(web3.clusterApiUrl(this.cluster))
    const accounts = await connection.getProgramAccounts(
      programId,
      {
        dataSlice: { offset: 20, length: 20 }
      }
    );

    return accounts.map(account => account.pubkey);
  }

  public async isExecutable(pubkey: web3.PublicKey): Promise<boolean> {
    const connection = new web3.Connection(web3.clusterApiUrl(this.cluster))

    return await connection.getAccountInfo(pubkey).then(info => info?.executable ?? false)
  }

  public async getBalance(pubkey: web3.PublicKey): Promise<number> {
    const connection = new web3.Connection(web3.clusterApiUrl(this.cluster))

    return await connection.getBalance(pubkey);
  }
}

