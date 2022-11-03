interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1 className='text-4xl text-yellow-400'>Title 1 - </h1>
      <p>{props.count} Pools created</p>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()
  return {
    props: { count: data.count }
  }
}