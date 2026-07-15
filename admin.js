import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJo9jnpYxQgXO0-gcNQDFbbSbsTFIDI7w",
  authDomain: "my-portfolio-b4e7c.firebaseapp.com",
  projectId: "my-portfolio-b4e7c",
  storageBucket: "my-portfolio-b4e7c.firebasestorage.app",
  messagingSenderId: "590753489911",
  appId: "1:590753489911:web:ce2a581c72d753e73784f2",
  measurementId: "G-TTM14WKEL3",
};

const allowedAdminEmail = "ogahdivine001@gmail.com";
const isConfigured = !firebaseConfig.apiKey.startsWith("PASTE_");

const adminForm = document.querySelector("#adminForm");
const adminStatus = document.querySelector("#adminStatus");
const adminDashboard = document.querySelector("#adminDashboard");
const logoutButton = document.querySelector("#logoutButton");
const contentForm = document.querySelector("#contentForm");
const contentStatus = document.querySelector("#contentStatus");

const setStatus = (message, isError = false) => {
  adminStatus.textContent = message;
  adminStatus.classList.toggle("is-error", isError);
};

const showDashboard = () => {
  adminForm.hidden = true;
  adminDashboard.hidden = false;
  setStatus("");
};

const showLogin = () => {
  adminDashboard.hidden = true;
  adminForm.hidden = false;
};

if (!isConfigured) {
  setStatus(
    "Firebase is not connected yet. Paste your Firebase web app config into admin.js.",
    true,
  );
}

const app = isConfigured ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const siteDocRef = db ? doc(db, "site", "main") : null;

const defaultContent = {
  heroName: "Ogah Divine",
  heroCopy:
    "I build clear, useful digital experiences for people and businesses that need a stronger presence online.",
  instagramUrl: "https://www.instagram.com/ogahdivine2008/?hl=en",
  xUrl: "https://x.com/DivineOgah2008",
  testimonials: [
    {
      quote:
        "Divine creates clean, responsive websites and pays attention to the small details that make a page feel professional.",
      name: "Client Feedback",
    },
    {
      quote:
        "The design process was clear, fast, and easy to follow. The final website looked modern on both mobile and desktop.",
      name: "Project Review",
    },
    {
      quote:
        "A reliable frontend developer with a good eye for layout, spacing, and user-friendly design.",
      name: "Collaboration Note",
    },
  ],
};

const setContentStatus = (message, isError = false) => {
  contentStatus.textContent = message;
  contentStatus.classList.toggle("is-error", isError);
};

const fillContentForm = (content) => {
  contentForm.heroName.value = content.heroName || defaultContent.heroName;
  contentForm.heroCopy.value = content.heroCopy || defaultContent.heroCopy;
  contentForm.instagramUrl.value =
    content.instagramUrl || defaultContent.instagramUrl;
  contentForm.xUrl.value = content.xUrl || defaultContent.xUrl;

  const testimonials = content.testimonials || defaultContent.testimonials;

  testimonials.slice(0, 3).forEach((testimonial, index) => {
    const number = index + 1;
    contentForm[`testimonial${number}`].value = testimonial.quote || "";
    contentForm[`testimonialName${number}`].value = testimonial.name || "";
  });
};

const loadContent = async () => {
  if (!siteDocRef) {
    return;
  }

  setContentStatus("Loading website content...");

  try {
    const snapshot = await getDoc(siteDocRef);
    fillContentForm(snapshot.exists() ? snapshot.data() : defaultContent);
    setContentStatus(snapshot.exists() ? "Content loaded." : "Default content loaded. Save once to publish it to Firebase.");
  } catch (error) {
    fillContentForm(defaultContent);
    setContentStatus("Could not load Firestore content. Check your Firestore rules.", true);
  }
};

if (auth) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      showLogin();
      return;
    }

    if (user.email !== allowedAdminEmail) {
      await signOut(auth);
      showLogin();
      setStatus(
        "This account is not allowed to access the admin dashboard.",
        true,
      );
      return;
    }

    showDashboard();
    await loadContent();
  });
}

adminForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!auth) {
    setStatus(
      "Firebase is not connected yet. Add your Firebase config first.",
      true,
    );
    return;
  }

  const formData = new FormData(adminForm);
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password"));
  const submitButton = adminForm.querySelector('button[type="submit"]');

  if (email !== allowedAdminEmail) {
    setStatus("Use the approved admin email for this dashboard.", true);
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Logging in...";
  setStatus("Checking admin account...");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    adminForm.reset();
    setStatus("");
  } catch (error) {
    setStatus(
      "Login failed. Check your email, password, and Firebase Authentication setup.",
      true,
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Login";
  }
});

logoutButton.addEventListener("click", async () => {
  if (auth) {
    await signOut(auth);
  }

  showLogin();
  setStatus("Logged out.");
});

contentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!siteDocRef || !auth.currentUser) {
    setContentStatus("Login and Firebase connection are required before saving.", true);
    return;
  }

  const submitButton = contentForm.querySelector('button[type="submit"]');
  const data = new FormData(contentForm);
  const testimonials = [1, 2, 3].map((number) => ({
    quote: String(data.get(`testimonial${number}`)).trim(),
    name: String(data.get(`testimonialName${number}`)).trim(),
  }));

  const content = {
    heroName: String(data.get("heroName")).trim(),
    heroCopy: String(data.get("heroCopy")).trim(),
    instagramUrl: String(data.get("instagramUrl")).trim(),
    xUrl: String(data.get("xUrl")).trim(),
    testimonials,
    updatedAt: serverTimestamp(),
    updatedBy: auth.currentUser.email,
  };

  submitButton.disabled = true;
  submitButton.textContent = "Saving...";
  setContentStatus("Saving website updates...");

  try {
    await setDoc(siteDocRef, content, { merge: true });
    setContentStatus("Website updates saved. Refresh index.html to see them.");
  } catch (error) {
    setContentStatus("Save failed. Check Firestore is enabled and your security rules allow this admin email.", true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Save Website Updates";
  }
});
