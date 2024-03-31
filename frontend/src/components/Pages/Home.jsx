
function Home() {
    return (
      <>
      <video autoPlay muted loop style={{ position: 'fixed', width: '99%', height: '90%', objectFit: 'cover', zIndex: '-1', filter: 'blur(7px)' }}>
      <source src="/videos/book.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
    );
  }

  export default Home
  