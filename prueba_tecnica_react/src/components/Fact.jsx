export const Fact = ({ fact, image }) => {
  return (
    <section>
      <p>{fact}</p>
      <img src={image} alt="Image from a kitty" />
    </section>
  );
}
