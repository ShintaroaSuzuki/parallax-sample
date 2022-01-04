import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { EmptyWallet, Verify, Edit, KeyboardOpen, Messages1, ArrowRight2 } from "iconsax-react";
import { useBudouX } from "../hooks/useBudouX";
import { motion } from "framer-motion"

type MemoImageProps = {
  windowHeight: number;
  windowWidth: number;
  imageUrl: string;
}

type DetailBannerProps = {
  href: string;
}

const MemoImage = React.memo(function memoImageComponent(props: MemoImageProps) {
  return (
    <div>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", height: props.windowHeight, width: props.windowWidth, position: 'absolute', zIndex: 1 }} />
      <Image
        src={props.imageUrl}
        layout="fixed"
        height={props.windowHeight}
        width={props.windowWidth}
        objectFit="cover"
        objectPosition="center top"
        alt="background"
      />
   </div>
  )
})

const DetailBanner = (props: DetailBannerProps) => {
  const [ isHovered, setIsHovered ] = useState(false)

  return (
    <Link href={props.href} passHref>
    <div style={{ marginTop: 40, width: '100%' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
      <text
        style={{
          fontSize: 18,
          fontWeight: "normal",
          color: "white",
          fontFamily: "Shippori Mincho, serif",
          opacity: isHovered ? 1 : 0.5
        }}
        href="/price"
      >
        詳しく見る
      </text>
      <div style={{ height: 2, width: '60%', background: 'rgba(255, 255, 255, 0.2)', marginTop: 15 }}>
        <motion.div
          style={{ height: 2, background: 'white', position: 'absolute' }} 
          animate={{ width: isHovered ? '60%' : '15%' }}
        />
      </div>
    </div>
    </Link>
  )
}

const ApplyButton = () => {
  const [ isHovered, setIsHovered ] = useState(false)

  return (
    <Link href="/inquiry" passHref>
      <motion.div 
        style={{ 
          backgroundColor: "#319fc4", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          borderRadius: 100 
        }}
        animate={{
          width: isHovered ? 300 * 1.2 : 300,
          height: isHovered ? 80 * 1.2 : 80
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Messages1 size="32" color="white" style={{ marginRight: 12 }} />
        <text style={{ fontSize: 18, color: "white", fontWeight: "bold", fontFamily: "Shippori Mincho, serif" }}>ご相談はこちらから</text>
        <ArrowRight2 size="32" color="white" style={{ marginLeft: 6 }} />
      </motion.div>
    </Link>
  )
}

const Home: NextPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const { parse } = useBudouX();

  function handleScroll(): void {
    setScrollY(window.scrollY);
  }

  function handleResize(): void {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    handleResize();
  }, []);

  return (
    <div className={styles.container} style={{ backgroundColor: "black" }}>
      <Head>
        <title>サンプルページ</title>
        <meta name="description" content="ホームページ作成のサンプルページです" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>
      <main className={styles.main}>
        <div
          style={{
            height: windowHeight * 5 + 250,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            zIndex: -1,
          }}
        >
        </div>
        <div
          style={{
            position: "fixed",
            height: 250,
            width: "100%",
            bottom: Math.min(0, scrollY - windowHeight * 4 - 250),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 250 - 40,
              width: "100%"
            }}
          >
            <ApplyButton />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: "#333333",
              width: "100%",
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <text 
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              SUGOI株式会社
            </text>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            top: 0,
            height: Math.max(0, windowHeight * 5 - scrollY),
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              height: windowHeight,
              width: windowWidth * 0.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "start",
              alignSelf: "end",
              right: 
                150 -
                Math.min(
                  Math.max(
                    (scrollY - windowHeight * 3.75) / (windowHeight * 0.25),
                    0
                  ),
                  1
                ) * 100,
              bottom: 150,
              opacity: Math.min(
                Math.max(
                  (scrollY - windowHeight * 3.75) / (windowHeight * 0.5),
                  0
                ),
                1
              ),
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <KeyboardOpen size="24" color="white" />
              <text
                style={{
                  fontSize: 20,
                  fontWeight: "normal",
                  color: "white",
                  fontFamily: "Shippori Mincho, serif",
                  marginLeft: 10,
                }}
              >
                ホームページに限りません
              </text>
            </div>
            <text
              style={{
                fontSize: 32,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
                marginBottom: 20,
              }}
            >
              {parse("モバイルアプリやECサイトなども、ご相談ください")}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "ホームページを作り、集客がうまくいき、専用のモバイルアプリやECサイトが作りたくなるかもしれません。そんなときも、私達に任せてください。"
              )}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "モバイルアプリ開発やECサイト制作の経験のある、私達のデザイナーやエンジニアが、あなたのビジネスを加速させるお手伝いをいたします。"
              )}
            </text>
            <DetailBanner href="/others"/>
          </div>
          <MemoImage imageUrl="/philipp-katzenberger-iIJrUoeRoCQ-unsplash.jpg" windowHeight={windowHeight} windowWidth={windowWidth}/>
        </div>
        <div
          style={{
            position: "fixed",
            top: 0,
            height: Math.max(0, windowHeight * 4 - scrollY),
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              height: windowHeight,
              width: windowWidth * 0.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "start",
              alignSelf: "start",
              left: 
                150 -
                Math.min(
                  Math.max(
                    (scrollY - windowHeight * 2.75) / (windowHeight * 0.25),
                    0
                  ),
                  1
                ) * 100,
              bottom: 150,
              opacity: Math.min(
                Math.max(
                  (scrollY - windowHeight * 2.75) / (windowHeight * 0.5),
                  0
                ),
                1
              ),
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <Edit size="24" color="white" />
              <text
                style={{
                  fontSize: 20,
                  fontWeight: "normal",
                  color: "white",
                  fontFamily: "Shippori Mincho, serif",
                  marginLeft: 10,
                }}
              >
                自由に内容を編集できる
              </text>
            </div>
            <text
              style={{
                fontSize: 32,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
                marginBottom: 20,
              }}
            >
              {parse("あなた自身で、ホームページの内容を編集できます。")}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "ホームページの内容を、あなた自身で、簡単に編集することが可能です。"
              )}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "ブログのように、コンテンツを追加していくことで、ますますあなたらしく、ホームページを彩ってください。"
              )}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse("")}
            </text>
            <DetailBanner href="/flexibility"/>
          </div>
          <MemoImage imageUrl="/darryl-brian-bDn1Wi1ixLw-unsplash.jpg" windowHeight={windowHeight} windowWidth={windowWidth}/>
        </div>
        <div
          style={{
            position: "fixed",
            top: 0,
            height: Math.max(0, windowHeight * 3 - scrollY),
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              height: windowHeight,
              width: windowWidth * 0.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "start",
              alignSelf: "end",
              right: 
                150 -
                Math.min(
                  Math.max(
                    (scrollY - windowHeight * 1.75) / (windowHeight * 0.25),
                    0
                  ),
                  1
                ) * 100,
              bottom: 150,
              opacity: Math.min(
                Math.max(
                  (scrollY - windowHeight * 1.75) / (windowHeight * 0.5),
                  0
                ),
                1
              ),
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <Verify size="24" color="white" />
              <text
                style={{
                  fontSize: 20,
                  fontWeight: "normal",
                  color: "white",
                  fontFamily: "Shippori Mincho, serif",
                  marginLeft: 10,
                }}
              >
                信頼が得られる
              </text>
            </div>
            <text
              style={{
                fontSize: 32,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
                marginBottom: 20,
              }}
            >
              {parse("高品質なホームページで、お客様から信頼を得られます。")}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "ホームページは、ときに会社の顔になり、第一印象を左右するものでもあります。"
              )}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "専属のデザイナーとエンジニアが、あなたのホームページを１から作ります。また、あなたのお店や会社のイメージや、ビジョンについてもぜひお聞かせください。それを踏まえ、私達からホームページを提案させていただければ幸いです。"
              )}
            </text>
            <DetailBanner href="quality"/>
          </div>
          <MemoImage imageUrl="/artur-aldyrkhanov-3bwMp-TyxOE-unsplash.jpg" windowHeight={windowHeight} windowWidth={windowWidth}/>
        </div>
        <div
          style={{
            position: "fixed",
            top: 0,
            height: Math.max(0, windowHeight * 2 - scrollY),
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              height: windowHeight,
              width: windowWidth * 0.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "start",
              left:
                150 -
                Math.min(
                  Math.max(
                    (scrollY - windowHeight * 0.75) / (windowHeight * 0.25),
                    0
                  ),
                  1
                ) * 100,
              bottom: 150,
              opacity: Math.min(
                Math.max(
                  (scrollY - windowHeight * 0.75) / (windowHeight * 0.5),
                  0
                ),
                1
              ),
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <EmptyWallet size="24" color="white" />
              <text
                style={{
                  fontSize: 20,
                  fontWeight: "normal",
                  color: "white",
                  fontFamily: "Shippori Mincho, serif",
                  marginLeft: 10,
                }}
              >
                手軽に始められる
              </text>
            </div>
            <text
              style={{
                fontSize: 32,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
                marginBottom: 20,
              }}
            >
              {parse(
                "SUGOI株式会社なら、月々3,000円から、自分だけのホームページが作れます。"
              )}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "お店を開いたり、ビジネスを始めた直後だと、なかなか心理的にも金銭的にも余裕がないと思います。そんななか、ホームページの制作に時間やお金をとられると大変でしょう。"
              )}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "私達は、あなたの要望を形にするお手伝いをします。丸投げで構いません。ホームページ制作は、私達にまかせて、従業員を集めたり、製品開発に励んだりと、あなたにしかできないことに時間を使ってください。"
              )}
            </text>
            <text
              style={{
                fontSize: 16,
                fontWeight: "normal",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              {parse(
                "また、最初はお金がたくさんかかると思います。あなたのビジネスが軌道に乗ってきてから、費用はお支払いいただければけっこうです。月々3,000円から、サブスク型でホームページの作成を請け負います。"
              )}
            </text>
            <DetailBanner href="/price"/>
          </div>
          <MemoImage imageUrl="/david-van-dijk-3LTht2nxd34-unsplash.jpg" windowHeight={windowHeight} windowWidth={windowWidth}/>
        </div>
        <div
          style={{
            position: "fixed",
            top: 0,
            height: Math.max(0, windowHeight - scrollY),
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              height: windowHeight,
              width: windowWidth,
              display: "flex",
              justifyContent: 'center',
              alignItems: "center",
              opacity: Math.min(
                Math.max(
                  1 - scrollY * 2 / windowHeight,
                  0
                ),
              1),
              bottom: 0
            }}
          >
            <text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "white",
                fontFamily: "Shippori Mincho, serif",
              }}
            >
              ホームページ作成、どこも高くない？
            </text>
          </div>
          <MemoImage imageUrl="/sebastian-svenson-LpbyDENbQQg-unsplash.jpg" windowHeight={windowHeight} windowWidth={windowWidth}/>
        </div>
      </main>
    </div>
  );
};

export default Home;
