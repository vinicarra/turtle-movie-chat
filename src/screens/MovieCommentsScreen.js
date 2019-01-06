import React, { Component } from 'react';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, Container, ListItem, Thumbnail, 
  Left, H3, Body, Button, Item, Input, Grid, Col, Icon } from 'native-base';
import { fetchComments, editCommentText, addComment } from '../actions/MoviesActions';

class MovieCommentsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('movie', { title: 'Movie' }).title
    }
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const movie = this.props.navigation.getParam('movie');
    this.props.fetchComments({ title: movie.title });
  }

  renderItem = ({ item }) => {
    if (this.props.fetchingComments) {
      return null;
    }
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail small source={{ uri: item.profilePic }} />
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

  empty = () => {
    if (this.props.fetchingComments) {
      return null;
    }
    return (
      <View padder>
        <Text style={{ fontSize: 18, alignSelf: 'center', textAlign: 'center' }}>
          There are no comments yet, be the first!
        </Text>
      </View>
    );
  }

  onChangeText = (text) => {
    this.props.editCommentText({ text });
  }

  sendComment = () => {
    const { comment, addComment } = this.props;
    const movie = this.props.navigation.getParam('movie');
    if (comment) {
      addComment({ comment, title: movie.title });
    }
  }

  render() {
    const movie = this.props.navigation.getParam('movie');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{ flex: 1, }}>
        <Container>
          <View style={{ flex: 1, }}>
            <FlatList
              data={this.props.comments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
              onRefresh={() => this.props.fetchComments({ title: movie.title })}
              refreshing={this.props.fetchingComments}
              ListEmptyComponent={this.empty}
            />
          </View>
          <View padder style={{ width: '100%', flexDirection: 'row' }}>
            <Grid>
              <Col size={5}>
                <Item rounded style={{ paddingHorizontal: 8 }}>
                  <Input
                    placeholder={'Type a comment'}
                    value={this.props.comment}
                    onChangeText={this.onChangeText}
                    disabled={this.props.addingComment}
                  />
                </Item>
              </Col>
              <Col size={1} style={{ justifyContent: 'center' }}>
                <Button
                  disabled={this.props.addingComment}
                  onPress={this.sendComment} 
                  rounded
                  style={{ alignSelf: 'flex-end' }}
                >
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
  comments: state.MoviesReducer.comments,
  comment: state.MoviesReducer.comment,
  addingComment: state.MoviesReducer.addingComment,
  fetchingComments: state.MoviesReducer.fetchingComments,
});

export default connect(mapStateToprops, { fetchComments, editCommentText, addComment })(MovieCommentsScreen);
