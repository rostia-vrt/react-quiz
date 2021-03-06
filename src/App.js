import Layout from '../src/hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'

function App() {
  return (
    <Layout>
     <Switch>
       <Route path="/auth" component={Auth} />
       <Route path="/quiz-creator" component={QuizCreator} />
       <Route path="/quiz/:id" component={Quiz} />
       <Route path="/" component={QuizList} />

     </Switch>
    </Layout>
  );
}

export default App;
