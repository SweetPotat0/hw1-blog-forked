import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import PaginationSection from "../components/PaginationSection";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'

const PageSize: number = 10;

export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.post.findMany({
        skip: 0,
        take: PageSize,
        where: {
            published: true,
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });
    const posts_count = await prisma.post.count();
    return {
        props: { feed: feed, posts_count: posts_count },
    };
};

type Props = {
    feed: PostProps[];
    posts_count: number;
};

const Blog: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div className="page">
                <h1>Public Feed</h1>
                <main>
                    {props.feed.map((post) => (
                        <div key={post.id} className="post">
                            <Post post={post} />
                        </div>
                    ))}
                </main>
                <PaginationSection currentPage={1} hintCount={4} pageCount={props.posts_count / PageSize}></PaginationSection>
            </div>
            <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
        </Layout>
    );
};

export default Blog;
