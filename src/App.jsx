import './App.css'
import App2 from './App2.jsx';
import Article from './components/Article.jsx';
import DataContext from './components/Context/dataContext.jsx';
import Form from './components/Form.jsx';
import { useEffect, useState } from 'react';
import EditForm from './components/EditForm.jsx';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Contact } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import IndividualPerformance from "./components/IndividualPerformance.jsx"
import { Toaster } from "react-hot-toast";
import HighlyRated from "./components/HighlyRated"
import MostViews from './components/MostViews';
import Newest from './components/Newest';
import Navbar from './components/Navbar';
import ContactPage from './components/Contact';
import {
  SignIn,
  SignUp,
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import LeaderBoard from './components/LeaderBoard.jsx';
import { Routes, Route } from "react-router-dom";

function App() {
  const navigate=useNavigate();
  const location=useLocation();
  const currentPath = location.pathname;
        let complete_data = [
  {
    id: "B522061",
    topic: "Linked Lists",
    sem: 3,
    name: "Alice Johnson",
    subject: "Data Structures",
    description: "A linked list is a linear data structure where elements, called nodes, are linked using pointers. Each node contains two parts: the data and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists do not require contiguous memory allocation, making insertion and deletion operations more efficient in certain scenarios. There are several types of linked lists: singly linked lists, where each node links to the next; doubly linked lists, which link to both the next and previous nodes; and circular linked lists, where the last node points back to the first. Linked lists are especially useful when the size of the dataset changes frequently. They are fundamental in implementing various data structures such as stacks, queues, and graphs. However, linked lists do not provide constant-time access to elements, unlike arrays, and therefore can be slower in lookup operations. Understanding linked lists is essential in computer science because they teach the concept of dynamic memory allocation and pointer manipulation."
  },
  {
    id: "B123052",
    topic: "Integration Techniques",
    sem: 2,
    name: "Brian Kim",
    subject: "Mathematics",
    description: "Integration techniques are mathematical methods used to find the integral of functions. These techniques are essential in solving problems related to areas under curves, volumes of solids, and many real-life applications in physics and engineering. Common methods include substitution, integration by parts, partial fractions, and trigonometric identities. Substitution is used when the integrand can be simplified by changing variables. Integration by parts relies on the product rule of differentiation and is useful for integrating products of functions. Partial fraction decomposition is applied when integrating rational functions by expressing them as simpler fractions. Trigonometric identities help in simplifying trigonometric integrals. Mastery of these techniques is critical because many complex integrals cannot be solved directly and require a strategic approach. These skills also form the foundation for more advanced topics such as multivariable calculus and differential equations."
  },
  {
    id: "B325147",
    topic: "OSI Model",
    sem: 4,
    name: "Catherine Lee",
    subject: "Computer Networks",
    description: "The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and design network systems. It divides the communication process between two systems into seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer has a specific function and interacts with the layers directly above and below it. For instance, the Physical layer deals with the actual transmission of raw bits over a medium, while the Transport layer ensures reliable data transfer. The Application layer interfaces directly with the end-user. The OSI model helps standardize network communication and troubleshooting by allowing engineers to isolate problems at a specific layer. Though modern networks often use the simpler TCP/IP model in practice, the OSI model remains a foundational tool for learning about network architecture and communication protocols."
  },
  {
    id: "B418264",
    topic: "Normalization",
    sem: 3,
    name: "David Smith",
    subject: "DBMS",
    description: "Normalization in database management systems (DBMS) is the process of organizing data to reduce redundancy and improve data integrity. This involves dividing large tables into smaller, related tables and defining relationships between them. The main goal of normalization is to eliminate duplicate data and ensure that dependencies make sense. There are several normal forms (NF), such as 1NF, 2NF, 3NF, and BCNF, each with specific rules that must be satisfied. For example, 1NF requires that each column contains atomic values, while 3NF ensures that no transitive dependencies exist. Proper normalization makes the database more efficient and easier to maintain, but over-normalization can lead to complex queries and may affect performance. Hence, finding the right balance is crucial. Normalization is essential for designing robust databases in real-world applications."
  },
  {
    id: "B629378",
    topic: "React Hooks",
    sem: 5,
    name: "Emma Garcia",
    subject: "Web Development",
    description: "React Hooks are functions introduced in React 16.8 that allow developers to use state and other React features in functional components. Before hooks, only class components could manage state and lifecycle methods. The most commonly used hooks are `useState`, which allows you to add local state to a functional component, and `useEffect`, which lets you perform side effects like fetching data or updating the DOM. Other hooks include `useContext`, `useRef`, and `useReducer`, each serving specific use cases. Hooks promote cleaner and more reusable code by reducing the need for class components and enabling custom hooks to encapsulate logic. They follow strict rules, such as only calling hooks at the top level and not inside loops or conditions. Understanding hooks is fundamental to modern React development, as they simplify component design and improve maintainability."
  },
  {
    id: "B430975",
    topic: "Pipelining",
    sem: 4,
    name: "Farhan Malik",
    subject: "Computer Architecture",
    description: "Pipelining is a technique in computer architecture that increases instruction throughput by overlapping the execution of multiple instructions. Similar to an assembly line, each instruction is divided into stages (like fetch, decode, execute, etc.), and each stage processes a different instruction simultaneously. This allows multiple instructions to be in different phases of execution at the same time, significantly improving CPU performance. However, pipelining introduces challenges such as hazards: data hazards, control hazards, and structural hazards. These can be resolved using techniques like forwarding, stalling, and branch prediction. While pipelining boosts speed, its effectiveness depends on the instruction flow and the hardware's ability to handle conflicts. Understanding pipelining is crucial for designing high-performance processors and optimizing software that runs efficiently on modern CPUs."
  },
  {
    id: "B559183",
    topic: "Greedy Algorithms",
    sem: 5,
    name: "Grace Wong",
    subject: "Algorithms",
    description: "Greedy algorithms are problem-solving techniques that make the locally optimal choice at each step with the hope of finding a global optimum. These algorithms are simple and efficient, particularly useful in optimization problems like activity selection, Kruskal’s and Prim’s algorithms for minimum spanning trees, and Huffman coding. A greedy strategy doesn't reconsider its choices, which makes it faster but sometimes suboptimal. To work correctly, the problem must exhibit the greedy-choice property and optimal substructure. Understanding the conditions under which greedy algorithms are applicable is essential, as they often provide faster solutions than other approaches like dynamic programming. They're widely used in scenarios where quick, reasonably good solutions are acceptable or when a provably optimal greedy approach exists."
  },
  {
    id: "B217384",
    topic: "Inheritance",
    sem: 2,
    name: "Hassan Ali",
    subject: "OOP",
    description: "Inheritance is a fundamental concept in Object-Oriented Programming (OOP) that allows a class (called a subclass or derived class) to inherit properties and behaviors (methods and attributes) from another class (called a superclass or base class). It promotes code reusability, as common functionality can be written once in a base class and extended by derived classes. For example, a base class 'Animal' might have methods like `eat()` and `sleep()`, which are inherited by subclasses like 'Dog' or 'Cat'. Inheritance supports hierarchical classification and helps in creating more manageable and scalable code. There are different types of inheritance: single, multiple, multilevel, and hierarchical. However, it must be used carefully to avoid tight coupling and maintain clear class responsibilities. Understanding inheritance is key to designing effective and reusable OOP systems."
  },
  {
    id: "B136279",
    topic: "Recursion",
    sem: 1,
    name: "Isabella Thompson",
    subject: "Programming Basics",
    description: "Recursion is a programming technique where a function calls itself to solve smaller instances of a problem. It consists of a base case (which stops the recursion) and a recursive case (which breaks the problem into smaller sub-problems). Common examples include computing factorials, generating Fibonacci numbers, and traversing trees. Recursion can simplify code and mirror mathematical definitions, making it intuitive for some problems. However, it must be used with care to avoid infinite loops and stack overflows. Recursive solutions are often less memory-efficient compared to iterative ones, but they can be more elegant and easier to understand. Mastering recursion is essential for solving problems involving divide-and-conquer strategies and understanding more complex algorithms like quicksort, mergesort, and backtracking."
  },
  {
    id: "B684210",
    topic: "Bayes Theorem",
    sem: 6,
    name: "Jack Patel",
    subject: "Probability & Statistics",
    description: "Bayes Theorem is a fundamental concept in probability theory that describes how to update the probability of a hypothesis based on new evidence. It is named after Thomas Bayes, who first formulated it. The theorem is expressed as P(A|B) = [P(B|A) * P(A)] / P(B), where P(A|B) is the posterior probability of event A given event B. Bayes Theorem is widely used in statistics, machine learning, medical diagnosis, and spam filtering. For instance, in a medical context, it helps calculate the probability that a patient has a disease given a positive test result. Understanding Bayes Theorem is crucial for working with probabilistic models and making informed decisions based on uncertain data. It forms the backbone of Bayesian inference, a powerful method in statistical modeling and machine learning."
  }
];
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(complete_data);
  }, []);

  return (

  
  <DataContext.Provider value={[data, setData]}>
    <Toaster position="top-right" />
  <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-6">
    <SignedIn>
      <div className="flex justify-end mb-4">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </SignedIn>

    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
    <Navbar/>
{currentPath !== "/" && (
  <>
    {/* Fixed Back button */}
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white shadow-md px-3 py-1 rounded-md text-blue-600 hover:underline"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>

    {/* Inline back to home button */}
    <div className="mb-6 flex justify-end pr-4">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>
    </div>
  </>
)}

    {/* Routes */}
    <Routes>
      <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
      <Route path="/edit/:id" element={<EditForm />} />
      <Route path="/article/:id" element={<SignedIn><Article /></SignedIn>} />
      <Route path="/form" element={<SignedIn><Form /></SignedIn>} />
      <Route path='/leaderboard' element={<LeaderBoard/>}/>
      <Route path='/performance/:email' element={<IndividualPerformance/>}/>
      <Route path='/highlyrated' element={<HighlyRated/>}/>
      <Route path='/mostviews' element={<MostViews/>}/>
      <Route path='/new' element={<Newest/>}/>
       <Route path='/contact' element={<ContactPage/>}/>
       <Route path="/" element={<SignedIn><App2 /></SignedIn>} />
    </Routes>
  </div>
</DataContext.Provider>

  );
}

export default App;

