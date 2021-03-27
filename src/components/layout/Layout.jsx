

export function Layout({ News }) {
  return (
    <div>
      <header>
          <h1><strong>RÚV fréttir</strong></h1>
      </header>
      <main>
        {News}
      </main>
      <hr/>
      <p>Fréttir frá <a href="https://www.ruv.is/">RÚV</a>.</p>
    </div>
  );
}
