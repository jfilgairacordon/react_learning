export const Fact = ({ fact, image }) => {
  return (
    <section>
      <p data-testid='fact-text'>{fact}</p>
      <img src={image} alt='Image from a kitty' />
    </section>
  )
}
