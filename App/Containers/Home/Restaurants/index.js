class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <HeaderComponent title="Home" />
        <Content />
        <FooterComponent />
      </Container>
    );
  }
}
