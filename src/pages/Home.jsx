function Home () {
  return (
    <main role='main' className='inner cover'>
      <h1 className='cover-heading title'>Mikulášské odpoledne</h1>
      <span className='underline-animation' />
      <div className='fade-down'>
        <p className='lead description'>Zarezervujte si svoje lístky ještě dnes.</p>
        {/* <% if (!(moment().diff(req.session.year.reservations.end) >= 0)) { %>
        <p className='lead'>
          <a href='/reservation' className='btn btn-lg btn-secondary'>Rezervace</a>
        </p>
        <% } %> */}
      </div>
    </main>
  )
}

export default Home
