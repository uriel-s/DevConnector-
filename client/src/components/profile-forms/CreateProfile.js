import {Link , withRouter} from 'react' ;
import React,{ useState ,Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createProfile} from '../../actions/profile';

const CreateProfile = ({ createProfile , history}) => {
const [formData ,setFormData ] = useState({
 company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
});

const [displaySocialInputs, toggleSocialInputs] = useState(false);

const {  
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;


  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history );
  };

    return (
    
<div>
    just a div
</div>
       
    );
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));