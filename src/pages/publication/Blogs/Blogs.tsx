import react, { useState } from 'react';
import { DATA_SCI_BLOG, DATA_VISUALIZATION, ETHICS_DATA_SCIENCE, EXPLAINABILITY, MACHINE_LEARNING, ORLANDO, SENTIMENTAL_ANALYSIS} from '../../../utils/utils'; 

const blogLinks = [
    {
        key: 'data-sci-blog',
        title: 'Data Science Blog',
        url: DATA_SCI_BLOG,
    },
    {
        key: 'data-visualization',
        title: 'Data Visualization',
        url: DATA_VISUALIZATION,
    },
    {
        key: 'ethics-data-science',
        title: 'Ethics in Data Science',
        url: ETHICS_DATA_SCIENCE,
    },
    {
        key: 'explainability',
        title: 'Explainability in Data Science',
        url: EXPLAINABILITY,
    },
    {
        key: 'machine-learning',
        title: 'Machine Learning',
        url: MACHINE_LEARNING,
    },
    {
        key: 'orlando',
        title: 'Orlando Data Science Conference',
        url: ORLANDO,
    },
    {
        key: 'sentimental-analysis',
        title: 'Sentimental Analysis',
        url: SENTIMENTAL_ANALYSIS,
    }
];

const Blogs = () => {
    const [selected, setSelected] = useState('data-sci-blog');
    const selectedBlog = blogLinks.find(blog => blog.key == selected);

    return (
        <div className ="flex">
            <div className="w-1/4 p-4">
                <h2 className="text-xl font-bold mb-4">Blogs</h2>
                <ul className="space-y-2">
                    {blogLinks.map(blog => (
                        <li key={blog.key}>
                            <button
                                className={`hover:shadow-lg hover:bg-gray-400 w-full text-left p-2 rounded ${selected === blog.key ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setSelected(blog.key)}
                            >
                                {blog.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 p-4">
                {selectedBlog && (
                    <iframe
                        className="w-full h-screen"
                        src={selectedBlog.url}
                        title={selectedBlog.title}
                    />
                )}
            </div>
        </div>
    )
}

export default Blogs;