import React from 'react';
import { Article } from './Article';
import { useRouter } from 'next/navigation';

interface IProp {
  article?: Article;
  onArticleClick: (article: Article) => void;
}

const ArticleCard = ({ article, onArticleClick  }: IProp) => {
	const router = useRouter();
	if (article == undefined) {
		return null;
	}

	const onClick = () => {
		onArticleClick(article);
	};

	return (
		<div className='card_container' onClick={onClick}>
			<p>{article.title}</p>
			<p>{article.doi}</p>
		</div>
	);
};

export default ArticleCard;
