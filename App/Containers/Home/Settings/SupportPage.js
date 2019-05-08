import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { Container, Content, Icon, H1, H3, Form, Item, Input, Label, Picker, Textarea, Button } from 'native-base';
import HeaderComponent from 'App/Components/Header';
import UserInfo from 'App/Components/Settings/UserInfo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SupportPage extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    submitMessage(){
        alert("Your message has been submitted, we'll get back to you shortly!");
    }

    render(){
        const { user } = this.props;
        const { profile } = user;
        
        return(
            <Container>
                <Content>
                    <HeaderComponent title="Support" back={true} />
                    <UserInfo profile={profile} />
                    <Text style={styles.infoText}>Welcome to Momo Now Support, the average response time for your queries is 10 minutes.</Text>
                    <View>
                        <Form>
                            <Item floatingLabel>
                                <Label>Please Enter Order ID</Label>
                                <Input />
                            </Item>
                            <Item picker>
                                <Label style={{marginLeft: "4%"}}>Query type?</Label>
                                <Picker 
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: "50%", marginLeft: "20%", textAlign: 'center' }}
                                    placeholder="Please choose an issue type"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"                                    
                                >                                
                                    <Picker.Item label="Where is my order?" value="order-location" />
                                    <Picker.Item label="Damaged or Opened Order" value="damaged" />
                                    <Picker.Item label="Payment Related Issues" value="payment" />                                                                
                                </Picker>
                            </Item>                                                           
                            <Textarea style={{marginBottom: 20, marginTop: 20}} rowSpan={5} bordered placeholder="Please enter a message"></Textarea>
                            <Button full onPress={()=>this.submitMessage()}>
                                <Text style={{ color: '#fff' }}>Continue</Text>
                            </Button>                         
                        </Form>
                    </View>
                </Content>                
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    infoText: {
        textAlign: "center",
        color: "teal",
        padding: 10
    }
})

const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};
export default connect(
	mapStateToProps,	
)(SupportPage);