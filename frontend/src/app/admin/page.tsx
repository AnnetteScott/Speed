'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from "../../components/auth"; // Importing User type from auth.ts
import NavBar from '../../components/navBar'

// Article interface
interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  pubYear: number;
  claim: string[];
  evidence: string;
  createdAt: string;
  moderated: boolean;
  analysed: boolean;
  approved: boolean;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // Fetch users
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth')
      .then((res) => res.json())
      .then((users: User[]) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log('Error fetching users: ' + err);
      });
  }, []);

  // Fetch pending articles
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/articles/pending')
      .then((res) => res.json())
      .then((articles) => {
        setArticles(articles);
        setLoadingArticles(false);
      })
      .catch((err) => {
        console.log('Error fetching articles: ' + err);
        setLoadingArticles(false);
      });
  }, []);

  function deleteUser(id: string | undefined) {
    if (!id) {
      return;
    }

    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/auth/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((err) => {
        console.log('Error deleting user: ' + err);
      });
  }

  function approveArticle(id: string) {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/approve/${id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setArticles(articles.filter(article => article._id !== id));
      })
      .catch((err) => {
        console.log('Error approving article: ' + err);
      });
  }

  function rejectArticle(id: string) {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/reject/${id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setArticles(articles.filter(article => article._id !== id));
      })
      .catch((err) => {
        console.log('Error rejecting article: ' + err);
      });
  }

  return (
    <main>
      <NavBar />
      <Link href="/add-user">Add User</Link>
      
      {/* User Management Table */}
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.role === "Admin" ? null :
                <button onClick={() => deleteUser(user._id)}>Delete</button>}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pending Articles Section */}
      <h2>Pending Articles for Moderation</h2>
      {loadingArticles ? (
        <p>Loading articles...</p>
      ) : articles.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Source</th>
              <th>Year</th>
              <th>Claims</th>
              <th>Evidence</th>
              <th>Submitted On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article =>
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.authors.join(', ')}</td>
                <td>{article.source}</td>
                <td>{article.pubYear}</td>
                <td>{article.claim.join(', ')}</td>
                <td>{article.evidence}</td>
                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => approveArticle(article._id)}>Approve</button>
                  <button onClick={() => rejectArticle(article._id)}>Reject</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p>No pending articles for moderation.</p>
      )}
    </main>
  );
}
