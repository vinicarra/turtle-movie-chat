import { createStackNavigator, createAppContainer } from "react-navigation";
import MovieListScreen from '../screens/MovieListScreen';
import MovieCommentsScreen from '../screens/MovieCommentsScreen';

const mainStack = createStackNavigator(
    {
        MovieList: MovieListScreen,
        MovieComments: MovieCommentsScreen,
    },
    {
        initialRouteName: 'MovieList',
    },
);

export default createAppContainer(mainStack);
