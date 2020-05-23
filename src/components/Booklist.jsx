// { useState, useEffect } 前者：子コンポーネントは関数なのでデータを保持できず
// 後者：データ更新にレンダリングが再実行されるためAPIリクエストが無限ループする問題が発生する。
// この問題を解消するための機能(Reactの標準機能)
import React, { useState, useEffect } from 'react';
import "./Booklist.css"

const Booklist = props => {
    // ※↓重要！bookDataにはデータを持ってきたら保管しておく変数。
    // ※setBookDataは関数で、これに新たに値を入れるとbookDataが更新される。
    // null：bookDataの初期値。
    const [bookData, setBookData] = useState(null);
    console.log(bookData);
    // APIから取得したデータがresponseに入る→setBookDataにデータが入る→bookDataが更新される。
    useEffect(() => {
        const result = props.getData?.(props.language).then(response => setBookData(response));
    }, [props])
    return (
        <div>
            <ul className="list">
                {
                    //bookDataがnullを満たす時は場合はnow loading,満たさない時は bookData.data.items.map～を実行。
                    // 繰り返し処理をするのでindexを渡してkeyに追加する。
                    bookData === null
                        ? <p>now loading</p>
                        : bookData.data.items.map((x, index) => <li>
                            <div key={index} className="box container">
                                <div className="image col-4">
                                    {/* vue,angular なぜか表示エラー */}
                                    <img src={x.volumeInfo.imageLinks.thumbnail} />
                                </div>
                                <div className="string col-8">
                                    <p>{x.volumeInfo.title}</p>
                                    <p>{x.volumeInfo.authors}</p>
                                </div>
                            </div>
                        </li>
                        )
                }
            </ul>
            {/* <p>this is {JSON.stringify(bookData)} list component</p> */}

            {/* <p>this is {bookData.data.items.map(x => <li>{x.volumeInfo.title}</li>)} list component</p> */}
        </div>
    );

}

export default Booklist;