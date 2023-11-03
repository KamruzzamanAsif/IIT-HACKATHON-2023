import styles from 'styles/Home.module.scss'
import contractDetails from '../info/contractDetails.json'
import contractABI from '../info/contractABI.json'

import ThemeToggleButton from 'components/Theme/ThemeToggleButton'
import { SetGreetings } from 'components/SetGreetings'

import ThemeToggleList from 'components/Theme/ThemeToggleList'
import { useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance } from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { useContractRead } from 'wagmi'
// import GreeterArtifact from '../../../artifacts/contracts/Greeter.sol/Greeter.json';
// import { Greeter__factory } from '../../typechain'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <Main />
      {/* <Footer /> */}
    </div>
  )
}

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <ThemeToggleList />
      </div>
      <div className="flex items-center">
        <ThemeToggleButton /> header <ThemeToggleList />
      </div>

      <div className="flex items-center">
        <ThemeToggleButton />
        <ThemeToggleList />
      </div>
    </header>
  )
}

function Main() {
  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  console.log("contract Address:")

  console.log(contractDetails.contractAddress)
  console.log("ABI:")
  console.log(contractABI.abi)
  const { data, isRefetching, refetch } = useContractRead({
    address: contractDetails.contractAddress as `0x${string}`,
    abi: contractABI.abi,
    functionName: 'greet',
  })
  console.log("data", data)

  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  })

  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()
  return (
    <main className={styles.main + ' space-y-6'}>
      <div className="text-center">
        <p className="font-medium">My DAPP</p>
      </div>

      <div>
        <h4 className="text-center text-sm font-medium">demo: ConnectWalletBtn Full</h4>
        <div className="flex w-full flex-col items-center">
          <ConnectWallet />
        </div>
      </div>

      <div>
        <h4 className="text-center text-sm font-medium">demo: useModal (rainbowkit ^0.4.3)</h4>
        <div className="flex w-full flex-col items-center">
          {openConnectModal && (
            <button
              onClick={openConnectModal}
              type="button"
              className="m-1 rounded-lg bg-orange-500 px-3 py-1 text-white transition-all duration-150 hover:scale-105"
            >
              useConnectModal
            </button>
          )}

          {openAccountModal && (
            <button
              onClick={openAccountModal}
              type="button"
              className="m-1 rounded-lg bg-orange-500 px-3 py-1 text-white transition-all duration-150 hover:scale-105"
            >
              useAccountModal
            </button>
          )}

          {openChainModal && (
            <button
              onClick={openChainModal}
              type="button"
              className="m-1 rounded-lg bg-orange-500 px-3 py-1 text-white transition-all duration-150 hover:scale-105"
            >
              useChainModal
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-xl rounded-xl bg-sky-500/10 p-6 text-center">
        <dl className={styles.dl}>
          <dt>Connector</dt>
          <dd>
            {connector?.name}
            {!address && (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <span onClick={openConnectModal} className="cursor-pointer hover:underline">
                    Not connected, connect wallet
                  </span>
                )}
              </ConnectButton.Custom>
            )}
          </dd>
          <dt>Connected Network</dt>
          <dd>{chain ? `${chain?.id}: ${chain?.name}` : 'n/a'}</dd>
          <dt>Switch Network</dt>
          <dd className="flex flex-wrap justify-center">
            {isConnected &&
              chains.map(x => (
                <button
                  disabled={!switchNetwork || x.id === chain?.id}
                  key={x.id}
                  onClick={() => switchNetwork?.(x.id)}
                  className={
                    (x.id === chain?.id ? 'bg-green-500' : 'bg-blue-500 hover:scale-105') +
                    ' m-1 rounded-lg px-3 py-1 text-white transition-all duration-150'
                  }
                >
                  {x.name}
                  {isNetworkLoading && pendingChainId === x.id && ' (switching)'}
                </button>
              ))}
            <ConnectWallet show="disconnected" />
          </dd>
          <dt>Account</dt>
          <dd className="break-all">{address ? `${address}` : 'n/a'}</dd>
          <dt>Balance</dt>
          <dd className="break-all">
            {isBalanceLoading ? 'loading' : balance ? `${balance?.formatted} ${balance?.symbol}` : 'n/a'}
          </dd>
        </dl>
      </div>
      {showAlert ? (
        <div className={'relative sticky top-0 z-50 mb-4 rounded border-0 bg-teal-500 px-6 py-4 text-white'}>
          <span className="mr-5 inline-block align-middle text-xl">
            <i className="fas fa-bell" />
          </span>
          <span className="mr-8 inline-block align-middle">
            <b className="capitalize">Transaction succeded!</b> View on etherscan:
            <a href={'https://rinkeby.etherscan.io/tx/' + txHash} target="_blank" className="italic underline">
              {' '}
              Etherscan Link
            </a>
          </span>
          <button
            className="absolute right-0 top-0 mr-6 mt-4 bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
      {address && (
        <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-teal-100 via-teal-300 to-teal-500">
          <div className="relative flex flex-col items-center justify-center">
            <div
              id="partnerCard"
              className="max-w-m flex min-h-[500px] flex-col overflow-hidden rounded-md bg-[#1c1c1c] p-2 text-gray-50"
            >
              <div>
                <h3 className="pb-4 pl-8 pt-2 text-left text-xl">Greeting App</h3>
              </div>

              <div className="flex min-h-[200px] items-center justify-center bg-[#2a2a2a]">
                <img
                  src="https://media.istockphoto.com/photos/hand-is-turning-a-dice-and-changes-the-word-meet-to-greet-picture-id1084115310?k=20&m=1084115310&s=612x612&w=0&h=TwrnLk7i0jdfixAxbJdd8_LF9ZOnkvM-1DGn-_VELHA="
                  alt="EasyCode"
                  className="w-100 object-cover"
                />
              </div>
              <div className="grid grid-cols-6">
                <div className="col-span-4 p-4 pr-0 text-lg">
                  <h4 className="font-bold">Current Greetings:</h4>

                  <div>
                    <p>{data?.toString()}</p>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' disabled={isRefetching} onClick={() => refetch()} style={{ marginLeft: 4 }}>
                      {isRefetching ? 'loading...' : 'refetch'}
                    </button>
                  </div>
                </div>
              </div>
              <SetGreetings />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}



function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <ThemeToggleList />
      </div>
      <div className="flex items-center">
        <ThemeToggleButton /> footer <ThemeToggleList />
      </div>

      <div className="flex items-center">
        <ThemeToggleButton />
        <ThemeToggleList />
      </div>
    </footer>
  )
}
