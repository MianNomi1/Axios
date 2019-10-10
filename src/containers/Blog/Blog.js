import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from "axios";
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selctedPostid: null
    }
    componentDidMount() {
        axios.get("/posts")
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatePosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                //console.log(updatePosts);
                this.setState({ posts: updatePosts });
            });
    }

    handlePostSelector(id) {
        this.setState({ selctedPostid: id });
    }
    render() {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author}
                clicked={() => this.handlePostSelector(post.id)} />
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selctedPostid} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;