import React, { Component } from 'react';
import { Container, ListItem, Content, Text, Body, Input, Item, View, Left, Right, Icon, Picker, Grid } from 'native-base';
import { FlatList } from 'react-native';

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
      originalMovies: [{
        "year": "2014",
        "votes": "757074",
        "title": "Guardians of the Galaxy",
        "runtime": "121",
        "revenue": "333.13",
        "rating": "8.1",
        "rank": "1",
        "metascore": "76",
        "genre": [
        "Action",
        "Adventure",
        "Sci-Fi"
        ],
        "director": "James Gunn",
        "description": "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
        "actors": [
        "Chris Pratt",
        "Vin Diesel",
        "Bradley Cooper",
        "Zoe Saldana"
        ]
        },
        {
          "year": "2012",
          "votes": "485820",
          "title": "Prometheus",
          "runtime": "124",
          "revenue": "126.46",
          "rating": "10",
          "rank": "2",
          "metascore": "65",
          "genre": [
          "Adventure",
          "Mystery",
          "Sci-Fi"
          ],
          "director": "Ridley Scott",
          "description": "Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.",
          "actors": [
          "Noomi Rapace",
          "Logan Marshall-Green",
          "Michael Fassbender",
          "Charlize Theron"
          ]
          },
      ],
      filteredMovies: [{
        "year": "2014",
        "votes": "757074",
        "title": "Guardians of the Galaxy",
        "runtime": "121",
        "revenue": "333.13",
        "rating": "8.1",
        "rank": "1",
        "metascore": "76",
        "genre": [
        "Action",
        "Adventure",
        "Sci-Fi"
        ],
        "director": "James Gunn",
        "description": "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
        "actors": [
        "Chris Pratt",
        "Vin Diesel",
        "Bradley Cooper",
        "Zoe Saldana"
        ],
        },
        {
          "year": "2012",
          "votes": "485820",
          "title": "Prometheus",
          "runtime": "124",
          "revenue": "126.46",
          "rating": "10.0",
          "rank": "2",
          "metascore": "65",
          "genre": [
          "Adventure",
          "Mystery",
          "Sci-Fi"
          ],
          "director": "Ridley Scott",
          "description": "Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.",
          "actors": [
          "Noomi Rapace",
          "Logan Marshall-Green",
          "Michael Fassbender",
          "Charlize Theron"
          ]
          },
      ],
      orderBy: null,
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem>
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
    console.log(parseInt(b.year));
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

  filter = (text = null) => {
    const { originalMovies, orderBy } = this.state;
    const originalMoviesBuffer = originalMovies.slice();

    if (!text && !orderBy) {
      this.setState({ filteredMovies: originalMovies });
      return;
    }

    let filteredArray;

    switch(orderBy) {
      case Order.RATING: {
        filteredArray = originalMoviesBuffer.sort(this.compareRating);
        break;
      }
      case Order.VOTES: {
        filteredArray = originalMoviesBuffer.sort(this.compareVotes);
        break;
      }
      case Order.YEAR: {
        filteredArray = originalMoviesBuffer.sort(this.compareYear);
        break;
      }
      default: {
        filteredArray = originalMoviesBuffer;
        break;
      }
    }

    if (text) {
      filteredArray = filteredArray.filter(item => (
        item.title.toLowerCase().includes(text.toLowerCase())
      ));
    }
    
    this.setState({ filteredMovies: filteredArray });
  }

  onValueChange = async (value) => {
    await this.setState({
      orderBy: value
    });
    this.filter();
  }

  render() {
    return (
      <Container>
        <Content>
          <View padder>
            <Item rounded style={{ paddingHorizontal: 8 }}>
              <Input
                clearButtonMode={'while-editing'}
                placeholder={'Search for a movie'}
                onChangeText={this.filter}
              />
              <Icon active name='search'/>
            </Item>
          </View>
            <Picker
              mode="dropdown"
              placeholder={'Order by'}
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ alignSelf: 'flex-end' }}
              selectedValue={this.state.orderBy}
              onValueChange={this.onValueChange}
            >
              <Picker.Item label="None" value={Order.NONE} />
              <Picker.Item label="Rating" value={Order.RATING} />
              <Picker.Item label="Year" value={Order.YEAR} />
              <Picker.Item label="Votes" value={Order.VOTES} />
            </Picker>
          <FlatList
            data={this.state.filteredMovies}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}

export default MovieListScreen;
