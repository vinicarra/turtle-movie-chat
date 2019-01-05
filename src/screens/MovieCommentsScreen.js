import React, { Component } from 'react';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, Container, ListItem, Thumbnail, Left, H3, Body, Button, Item, Input, Grid, Col, Icon } from 'native-base';

const comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor, libero a ultrices molestie, eros leo posuere erat, in elementum ex mauris at elit. In diam ex, hendrerit sed posuere sed, porttitor eget ipsum. Nulla id tincidunt lectus. In pretium accumsan convallis. Ut imperdiet lobortis euismod. Vestibulum vel diam vel velit aliquam varius. Donec ut erat pretium, sagittis mi at, viverra est. Curabitur malesuada sit amet ligula eget sagittis. Proin malesuada suscipit enim. Aliquam euismod velit nibh, ac efficitur nulla iaculis sit amet. Integer id rutrum orci. Etiam sit amet porta dui, nec tristique sem. Nullam porta erat urna, sed feugiat nulla consectetur at. Vestibulum mauris risus, accumsan ac magna ut, rhoncus iaculis libero.';

class MovieCommentsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('movie', { title: 'Movie' }).title
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: [
        { author: 'John', comment, timestamp: new Date().setMinutes(20) },
        { author: 'John', comment, timestamp: new Date().setMinutes(10) },
        { author: 'John', comment, timestamp: new Date().setMinutes(40) },
      ]
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail small source={{ uri: 'https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg' }} />
        </Left>
        <Body>
          <View>
            <H3 numberOfLines={2} style={{ fontWeight: 'bold' }}>
              {item.author}
            </H3>
            <Text>{item.comment}</Text>
          </View>
          <Text note style={{ alignSelf: 'flex-end' }}>
            {moment(item.timestamp).fromNow()}
          </Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, }}>
      <Container>
        <View style={{ flex: 1, }}>
          <FlatList
            data={this.state.comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
        <View padder style={{ width: '100%', flexDirection: 'row' }}>
          <Grid>
            <Col size={5}>
              <Item rounded style={{ paddingHorizontal: 8 }}>
                <Input placeholder={'Type a comment'} />
              </Item>
            </Col>
            <Col size={1} style={{ justifyContent: 'center' }}>
              <Button rounded style={{ alignSelf: 'flex-end' }}>
                <Icon ios="ios-send" android="md-send" />
              </Button>
            </Col>
          </Grid>
        </View>
      </Container>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToprops = (state) => ({

});

export default connect(mapStateToprops, null)(MovieCommentsScreen);
