import {filterSinger} from "./common"

export class Song {
  constructor({id, name, alias, artistsName, albumName, sq}) {
    this.id = id;
    this.name = name;
    this.alias = alias;
    this.artistsName = artistsName;
    this.albumName = albumName;
    this.sq = sq;
  }
}

export function createdSong(obj) {
  let ret = [];
  for (let i = 0; i < obj.length; i++) {
    const t = new Song({
      id: obj[i].id,
      name: obj[i].name,
      alias: obj[i].song.alias.length ? obj[i].song.alias[0] : '',
      artistsName: filterSinger(obj[i].song.artists),
      albumName: obj[i].song.album.name,
      sq: obj[i].song.score === 0 ? true : false,
    });
    ret.push(t);
  }
  return ret;
}

