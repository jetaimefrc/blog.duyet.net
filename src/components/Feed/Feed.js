// @flow strict
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';
import { gtagTrack } from '../../utils';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}>
            {moment(edge.node.frontmatter.date).format('MMMM YYYY')}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            <Link to={edge.node.fields.categorySlug} className={styles['feed__item-meta-category-link']}
              onClick={() => gtagTrack('CategoryLink', 'click', edge.node.fields.categorySlug)}>{edge.node.frontmatter.category}</Link>
          </span>
        </div>
        <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}
            onClick={() => gtagTrack('PostLink', 'click', edge.node.fields.slug, { title: edge.node.frontmatter.title })}>{edge.node.frontmatter.title}</Link>
        </h2>
        <p className={styles['feed__item-description']}>{edge.node.frontmatter.description}</p>
        <p className={styles['feed__item-thumbnail']}>
          <img src={edge.node.frontmatter.thumbnail} />
        </p>
        {/* <Link className={styles['feed__item-readmore']} to={edge.node.fields.slug}>Read</Link> */}
        {/* <Link className={styles['feed__item-readmore']} to={edge.node.fields.slug}>{' '}</Link> */}
      </div>
    ))}
  </div>
);

export default Feed;
