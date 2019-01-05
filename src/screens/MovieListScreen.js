import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Container, ListItem, Text, Body, Input, Item, View, Left, Right, Icon, Picker } from 'native-base';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/MoviesActions';

const Order = {
  NONE: 'none',
  RATING: 'rating',
  YEAR: 'year',
  VOTES: 'votes',
}

class MovieListScreen extends Component {
  static navigationOptions = {
    title: 'Movie List',
  };

  constructor(props) {
    super(props);
    this.state = {
      orderBy: null,
      filterText: '',
    }
  }

  componentDidMount() {
    this.props.fetchMovies();
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <ListItem onPress={() => navigation.navigate('MovieComments', { movie: item })}>
          <Left>
            <Body>
              <Text>{item.title} ({item.year})</Text>
              <Text note numberOfLines={2}>{item.description}</Text>
            </Body>
          </Left>
          <Right>
            <Icon name="arrow-forward"/>
          </Right>
      </ListItem>
    );
  }

  compareYear = (a, b) => {
    if (a.year > b.year)
      return -1;
    if (a.year < b.year)
      return 1;
    return 0;
  }

  compareVotes = (a, b) => {
    if (a.votes > b.votes)
      return -1;
    if (a.votes < b.votes)
      return 1;
    return 0;
  }

  compareRating = (a, b) => {
    const c1 = parseFloat(a.rating);
    const c2 = parseFloat(b.rating);
    if (c1 > c2)
      return -1;
    if (c1 < c2)
      return 1;
    return 0;
  }

  filter = () => {
    const { orderBy, filterText } = this.state;
    const { movies } = this.props;
    const moviesBuffer = movies.slice();

    if (!filterText && !orderBy) {
      this.setState({ filteredMovies: moviesBuffer });
      return;
    }

    let filteredArray;

    switch(orderBy) {
      case Order.RATING: {
        filteredArray = moviesBuffer.sort(this.compareRating);
        break;
      }
      case Order.VOTES: {
        filteredArray = moviesBuffer.sort(this.compareVotes);
        break;
      }
      case Order.YEAR: {
        filteredArray = moviesBuffer.sort(this.compareYear);
        break;
      }
      default: {
        filteredArray = moviesBuffer;
        break;
      }
    }

    if (filterText) {
      filteredArray = filteredArray.filter(item => (
        item.title.toLowerCase().includes(filterText.toLowerCase().trim())
      ));
    }
    
    this.setState({ filteredMovies: filteredArray });
  }

  onPickerChange = async (value) => {
    await this.setState({
      orderBy: value,
    });
    this.filter();
  }

  onChangeText = async (text) => {
    await this.setState({
      filterText: text,
    });
    this.filter();
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1, }}>
          <View padder>
            <Item rounded style={{ paddingHorizontal: 8 }}>
              <Input
                clearButtonMode={'while-editing'}
                placeholder={'Search for a movie'}
                onChangeText={this.onChangeText}
              />
              <Icon active name='search'/>
            </Item>
          </View>
          <Picker
            mode="dropdown"
            placeholder={'Order by'}
            iosIcon={<Icon name="ios-arrow-down" />}
            style={{ width: (Platform.OS === 'ios') ? undefined : 120, alignSelf: 'flex-end' }}
            selectedValue={this.state.orderBy}
            onValueChange={this.onPickerChange}
          >
            <Picker.Item label="None" value={Order.NONE} />
            <Picker.Item label="Rating" value={Order.RATING} />
            <Picker.Item label="Year" value={Order.YEAR} />
            <Picker.Item label="Votes" value={Order.VOTES} />
          </Picker>
          <FlatList
            getItemLayout={(data, index) => (
              {length: 90, offset: 90 * index, index}
            )}          
            keyExtractor={(item, index) => index.toString()}
            data={this.state.filteredMovies || this.props.movies}
            renderItem={this.renderItem}
            onRefresh={() => this.props.fetchMovies()}
            refreshing={this.props.fetchingMovies}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.MoviesReducer.movies,
  fetchingMovies: state.MoviesReducer.fetchingMovies,
});

export default connect(mapStateToProps, { fetchMovies })(MovieListScreen);
