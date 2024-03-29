import express from 'express';
import schools from './schools';
const router = express.Router();

const about = [
  {
    id: 'story',
    name: 'Our Story',
    description:
      "This idea started as an initiative geared towards another sector however since a nation's power lies in it educational system, we tought best to channel the passion into the same sector and here we are today! and of course all Thanks to you!",
    icon: './assets/img/story-e.webp'
  },
  {
    id: 'vision',
    name: 'Our Vision',
    description:
      'To ensure that problems facing education institution and prospective students majorly development and decision making respectively is solved and as such education is evenly distributed accross all sphere of people everywhere accross the nation',
    icon: './assets/img/vision.webp'
  },
  {
    id: 'mission',
    name: 'Our Mission',
    description:
      'We organize seminars, platforms such but not limitetd to this website, to create education awareness among the general mass.  We review the outcome of the programs and platforms and improve such statistics foster improvement ',
    icon: './assets/img/mission.webp'
  }
];
const school = [
  {
    id: 1,
    name: 'Unilag',
    description:
      ' Founded in 1962, the University of Lagos has, for over 5 decades, provided qualitative and research-oriented education to Nigerians and all those who have entered its domain in search of knowledge. The University has built a legacy of excellence and has been instrumental in the production of top range graduates and academia who have had tremendous impact, directly or indirectly, on growth and development in Nigeria.',
    icon: './assets/img/unilag.webp',
    url: 'someurl'
  },
  {
    id: 2,
    name: 'Petroleum Training Institute',
    description:
      'The Petroleum Training Institute is a specialized Institution with a mandate to train indigenous manpower to meet the technical and administrative demands. of the oil and gas and other allied industries in Nigeria and Africa. Organizations and Individuals have the opportunity to choose from a training bouquet of.',
    icon: './assets/img/main-campus.png',
    url: 'someurl'
  },
  {
    id: 3,
    name: 'Decagon Institute',
    description:
      'Decagon is a software engineering institute ushering in a new phase of tech-powered growth and prosperity in Nigeria by training and deploying an army of leader-developers. With a project-based curriculum, agile delivery methodology, mentor matching, and leadership modules, we transform any fast learner into a world-class software developer in just six months..',
    icon: '../assets/img/decadev.jpg',
    url: 'someurl'
  },
  {
    id: 4
  },
  {
    name: 'adedayo',
    id: 5
  },
  {
    name: 'adedayo',
    id: 6
  },
  {
    name: 'adedayo',
    id: 7
  }
];


router.get('/about', function(req, res, next) {
  res.json(about);
});

// Handles All Request to /schools route
router.use('/schools',schools);




export default router;
