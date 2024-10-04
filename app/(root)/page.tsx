import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {

  //store the name of the user who just logged in
  const loggedIn = {firstName: 'Avi', lastName: 'Gupta', email: 'avinashg@ymail.com'};

  return (
    <section className="home">
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
             type="greeting"
             title="Welcome"
             user={loggedIn?.firstName || 'Guest'}
             subtext='Access and manage your accounts and transactions efficiently'>
          </HeaderBox>
          <TotalBalanceBox
             accounts={[]}
             totalBanks={1}
             totalCurrentBalance={1500.69}
          />
        </header>

        RECENT TRANSACTIONS
      </div>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 123.50}, {currentBalance: 500}]}/>
    </section>
  )
}

export default Home
