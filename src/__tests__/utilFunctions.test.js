import { shortenText } from '../utils/functions';
import { wordCount, attachUserName } from '../../server/utils';
import { shortText, longText, posts, users } from './__data__/testData';

test('shortenText does not alter strings under 100 characters', () => {
    expect(shortenText(shortText)).toHaveLength(shortText.length);
});

test('shortenText should cut off extra characters at add ... to the end', () => {
    const shortenedText = shortenText(longText);
    expect(shortenedText).not.toHaveLength(longText.length);
    expect(shortenedText.slice(-3)).toBe('...');
});

test('wordCount should correctly count the number of words in a sentence', () => {
    expect(wordCount(posts)).toBe(233);
});

test('attachUserName should corrrectly add a users name to a post', () => {
    const [newPosts] = attachUserName(users, posts);
    expect(newPosts).toHaveProperty('displayName');
});

test('attachUserName should remove any post with no matching user', () => {
    const newPosts = attachUserName(users, posts),
          deletedPost = posts[5];    
    expect(newPosts).not.toContainEqual(deletedPost);
});