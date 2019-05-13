import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Content, Card, CardItem, Left, Body, Icon, Button} from 'native-base';
import HeaderComponent from 'App/Components/Header';
import UserInfo from 'App/Components/Settings/UserInfo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationService from 'App/Services/NavigationService';


class AddressPage extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){

        const { user } = this.props;	
        const { profile } = user;	

        return(
            <Container>
                <HeaderComponent title="Address Book" leftComponent={true} />
                <Content padder>
                    <View style={{marginBottom:10}}>
                        <Text style={styles.introText}>Hi, {profile.name}. You can add new addresses and edit existing addresses at this screen.</Text>
                    </View>
                    <Card>
                        <CardItem bordered header style={styles.cardItemStyleFix}>
                            <Left>
                                <Icon name="home" style={{fontSize: 40, color:"teal"}} />
                                <Body>
                                    <Text>C2, Sector 1, Noida, Uttar Pradesh - 201301</Text>
                                    <Text>Work</Text>
                                </Body>
                            </Left>                            
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem bordered header style={styles.cardItemStyleFix}>
                            <Left>
                                <Icon name="business" style={{fontSize: 40, color:"#FF5733"}} />
                                <Body>
                                    <Text>C2, Sector 1, Noida, Uttar Pradesh - 201301</Text>
                                    <Text>Home</Text>
                                </Body>
                            </Left>                            
                        </CardItem>
                    </Card>

                    <Button full padder style={{marginTop: 15, backgroundColor: "teal"}} onPress={()=>NavigationService.navigateAndReset("AddAddress")}>
                        <Text style={{color:"white"}}>Add a New Address</Text>
                    </Button>
                
                </Content>                
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    cardItemStyleFix:{
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    introText:{
        color: "teal",
        fontSize: 15,
        textAlign: "justify",
    }
})

const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};

export default connect(
    mapStateToProps,	
)(AddressPage);