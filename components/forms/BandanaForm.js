// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import {
//   Button, FloatingLabel, Form,
// } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import { createBandana, getBandanas, updateBandana } from '../../utils/data/bandanaData';

// const initalState = {
//   name: '',
//   size: '',
//   image: '',
//   description: '',
//   origin: '',
//   pattern: {
//     id: 0,
//     name: '',
//   },
//   marking: {
//     id: 0,
//     name: '',
//   },
//   color: {
//     id: 0,
//     name: '',
//   },
//   condition: {
//     id: 0,
//     name: '',
//   },

// };

// const BandanaForm = ({ user, obj }) => {
//   const [bandanaPattern, setBandanaPattern] = useState([]);
//   const [bandanaMarking, setBandanaMarking] = useState([]);
//   const [bandanaColor, setBandanaColor] = useState([]);
//   const [bandanaCondition, setBandanaCondition] = useState([]);
//   const [currentBandana, setCurrentBandana] = useState(initalState);
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentBandana((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const bandana = {
//       name: currentBandana.name,
//       size: currentBandana.size,
//       image: currentBandana.image,
//       description: currentBandana.description,
//       origin: currentBandana.origin,
//       // pattern: setBandanaPattern,
//       // marking: setBandanaMarking,
//       // color: setBandanaColor,
//       // condition: setBandanaCondition,
//       user: user.uid,
//     };
//     if (obj.id) {
//       updateBandana(bandana, obj.id).then(() => router.push('/bandanas'));
//     } else {
//       createBandana(bandana).then(() => router.push('/bandanas'));
//     }
//   };

//   useEffect(() => {
//     if (obj.id) {
//       const editBandana = {
//         name: obj.name,
//         size: obj.size,
//         image: obj.image,
//         description: obj.description,
//         origin: obj.origin,
//         pattern: obj.pattern.name,
//         marking: obj.marking.name,
//         color: obj.color.name,
//         condition: obj.condition.name,
//       };
//       setCurrentBandana(editBandana);
//     }
//     getBandanas().then(setCurrentBandana);
//   }, [obj]);
//   // console.warn(obj);
//   // console.warn(npcCategory);
//   // console.warn(currentNpc);

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Post'} Bandana</h2>
//         <Form.Group className="mb-3">
//           <Form.Label>Name</Form.Label>
//           <Form.Control name="name" required value={currentBandana.name} onChange={handleChange} />
//           <Form.Label>Size</Form.Label>
//           <Form.Control name="size" required value={currentBandana.size} onChange={handleChange} />
//           <Form.Label>Image</Form.Label>
//           <Form.Control name="image" required value={currentBandana.image} onChange={handleChange} />
//           <Form.Label>Description</Form.Label>
//           <Form.Control name="description" required value={currentBandana.description} onChange={handleChange} />
//           <Form.Label>Origin</Form.Label>
//           <Form.Control name="origin" required value={currentBandana.origin} onChange={handleChange} />

//         </Form.Group>
//         <FloatingLabel controlId="floatingSelect" label="Pattern" className="mb-3">
//           <Form.Select
//             aria-label="Pattern"
//             name="pattern"
//             onChange={handleChange}
//             className="mb-3"
//             value={currentBandana.pattern}
//             required
//           >
//             <option value="">Select Pattern Type</option>
//             {
//             // eslint-disable-next-line react/prop-types
//             bandanaPattern?.map((pattern) => (
//               <option
//                 key={pattern.id}
//                 value={pattern.id}
//                 selected={currentBandana.pattern === pattern.id}
//               >
//                 {pattern.name}
//               </option>
//             ))
//           }
//           </Form.Select>
//         </FloatingLabel>
//         <FloatingLabel controlId="floatingSelect" label="Marking" className="mb-3">
//           <Form.Select
//             aria-label="Marking"
//             name="marking"
//             onChange={handleChange}
//             className="mb-3"
//             value={currentBandana.marking}
//             required
//           >
//             <option value="">Select Marking Type</option>
//             {
//             // eslint-disable-next-line react/prop-types
//             bandanaMarking?.map((marking) => (
//               <option
//                 key={marking.id}
//                 value={marking.id}
//                 selected={currentBandana.marking === marking.id}
//               >
//                 {marking.name}
//               </option>
//             ))
//           }
//           </Form.Select>
//         </FloatingLabel>
//         <FloatingLabel controlId="floatingSelect" label="Color" className="mb-3">
//           <Form.Select
//             aria-label="Color"
//             name="color"
//             onChange={handleChange}
//             className="mb-3"
//             value={createBandana.color}
//             required
//           >
//             <option value="">Select a Color</option>
//             {
//             // eslint-disable-next-line react/prop-types
//             bandanaColor?.map((color) => (
//               <option
//                 key={color.id}
//                 value={color.id}
//                 selected={currentBandana.color === color.id}
//               >
//                 {color.name}
//               </option>
//             ))
//           }
//           </Form.Select>
//         </FloatingLabel>
//         <FloatingLabel controlId="floatingSelect" label="Condition" className="mb-3">
//           <Form.Select
//             aria-label="Condition"
//             name="condition"
//             onChange={handleChange}
//             className="mb-3"
//             value={currentBandana.condition}
//             required
//           >
//             <option value="">Select Condition</option>
//             {
//             // eslint-disable-next-line react/prop-types
//             bandanaCondition?.map((condition) => (
//               <option
//                 key={condition.id}
//                 value={condition.id}
//                 selected={currentBandana.condition === condition.id}
//               >
//                 {condition.name}
//               </option>
//             ))
//           }
//           </Form.Select>
//         </FloatingLabel>
//         <Button className="create" type="submit">{obj.id ? 'Update' : 'Create'} Recipe</Button>
//       </Form>
//     </>
//   );
// };

// BandanaForm.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string,
//     id: PropTypes.number,
//   }).isRequired,
//   obj: PropTypes.shape({
//     name: PropTypes.string,
//     size: PropTypes.string,
//     image: PropTypes.string,
//     description: PropTypes.string,
//     origin: PropTypes.string,
//     id: PropTypes.number,
//     pattern: PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//     }),
//     marking: PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//     }),
//     color: PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//     }),
//     condition: PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//     }),
//   }),
// }.isRequired;

// BandanaForm.defaultProps = {
//   obj: initalState,
// };

// export default BandanaForm;
