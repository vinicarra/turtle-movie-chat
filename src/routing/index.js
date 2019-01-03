import { createStackNavigator, createAppContainer } from "react-navigation";
import MoviesListScreen from '../screens/MoviesListScreen';
import MovieCommentsScreen from '../screens/MovieCommentsScreen';

const mainStack = createStackNavigator(
    {
        MoviesList: MoviesListScreen,
        MovieComments: MovieCommentsScreen,
    },
    {
        initialRouteName: 'MoviesList',
    },
);

export default createAppContainer(mainStack);
