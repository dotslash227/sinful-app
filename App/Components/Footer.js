import React from 'react';
import { Footer, FooterTab, Icon, Button } from 'native-base';

export default class FooterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active>
            <Icon active name="home" />
          </Button>
          <Button>
            <Icon name="layers" />
          </Button>
          <Button>
            <Icon name="user" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
