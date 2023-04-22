import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import Post, { PostProps } from "../../components/Post";
import PaginationSection from "../../components/PaginationSection";
import prisma from '../../lib/prisma'

const PageSize: number = 10;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const feed = await prisma.post.findMany({
        skip: (Number(params?.page_num) - 1) * PageSize,
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
        props: { feed: feed, page_num: Number(params?.page_num), posts_count: posts_count },
    };
};

type Props = {
    feed: PostProps[];
    page_num: number;
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
                <PaginationSection currentPage={props.page_num} hintCount={4} pageCount={Math.ceil(props.posts_count / PageSize)}></PaginationSection>
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
        </Layout >
    );
};

export default Blog;
