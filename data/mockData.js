// data/mockData.js

/**
 * mockData.js
 * Provides mock video feed data used in the application.
 * Each object simulates a video post with user and engagement details.
 */

export default [
  {
    id: 1,
    videoUrl: require('../assets/reels/skating.mp4'),
    title: 'skater',
    episode: 'EP 01',
    description:
      'Searching for a murderer whose deadly honeymoon is tragically cut short. As new clues emerge and the suspect list grows longer, the team races against time in a tense and unpredictable thriller.',
    userName: 'Gabar Singh',
    userImage: require('../assets/profilepic/skateboard.jpg'),
    likes: 200000,
    comments: 1300,
    shares: 456,
    earnings: 2100,
    isPaid: true,
  },
  {
    id: 2,
    videoUrl: require('../assets/reels/model.mp4'),
    title: 'TRAVEL',
    episode: 'EP 02',
    description:
      'Exploring hidden gems in the mountains made me realise there is more to life than gems. But after realising there was more to life I realised I could have found the gems and used them to buy a car.',
    userName: 'Priya Sharma',
    userImage: require('../assets/profilepic/amodel.jpg'),
    likes: 150000,
    comments: 900,
    shares: 300,
    earnings: 1500,
    isPaid: true,
  },
  {
    id: 3,
    videoUrl: require('../assets/reels/running.mp4'),
    title: 'runningman',
    episode: 'EP 09',
    description:
      "The only bad run is the one you didn't do. Push your limits, then break them. Running: the ultimate freedom. #runnersofinstagram Running: because therapy is expensive. #runningismytherapy #workout",
    userName: 'Jonita',
    userImage: require('../assets/profilepic/runner.jpg'),
    likes: 60000,
    comments: 456,
    shares: 323,
    earnings: 2000,
    isPaid: true,
  },
  {
    id: 4,
    videoUrl: require('../assets/reels/penguin.mp4'),
    title: 'dancingguy',
    episode: 'EP 10',
    description:
      'Lost in the rhythm, found in the dance. Dancing through life, one step at a time. Let the music move you; unleash your inner dancer. Dance is the hidden language of the soul.',
    userName: 'Anderson',
    userImage: require('../assets/profilepic/dancer.jpg'),
    likes: 150,
    comments: 10,
    shares: 3,
    earnings: 50,
    isPaid: false,
  },
];
