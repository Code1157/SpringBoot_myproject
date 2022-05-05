package com.yuhua.plus.controller.utils.spring_security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

/**
 * JWT工具类
 */
public class JwtUtil {
    //有效期
    public static final Long JWT_TTL = 24 * 60 * 60 * 1000L;  // 60 * 60 * 1000L:一个小时
    //设置密钥明文
    public static final String JWT_KEY = "huangyuhua";

    public static String getUUID() {
        String token = UUID.randomUUID().toString().replace("-", "");
        return token;
    }

    /**
     * 生成JWT
     * @param subject token中要存放的数据（json格式）
     * @return
     */
    public static String createJWT(String subject) {
        JwtBuilder builder = getJwtBuilder(subject, null, getUUID());  // 设置过期时间
        return builder.compact();
    }

    /**
     *  生成jtw
     * @param subject token中要存放的数据（json格式）
     * @param ttlMillis ttlMillis token超时时间
     * @return
     */
    public static String createJWT(String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, getUUID()); // 设置过期时间
        return builder.compact();
    }

    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if (ttlMillis == null) {
            ttlMillis = JwtUtil.JWT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setId(uuid)            // 唯一的id
                .setSubject(subject)    // 主题 可以是JSON数据
                .setIssuer("aaa")        // 签发者
                .setIssuedAt(now)       // 签发时间
                .signWith(signatureAlgorithm, secretKey)
                .setExpiration(expDate);
    }

    /**
     * 创建token
     * @param id
     * @param subject
     * @param ttlMillis
     * @return
     */
    public static String createJWT(String id, String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, id);  // 设置过期时间
        return builder.compact();
    }

    // 测试解析 token
    public static void main(String[] args) throws Exception{
//        String jwt = createJWT("1234");
//        System.out.println("jwt:"+jwt);
        Claims claims = parseJWT("eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0OTRmZjYxYzZlYTk0OTgzYmRmOGM1Y2RmNzczZWYyZCIsInN1YiI6IjEiLCJpc3MiOiJhYWEiLCJpYXQiOjE2NDYwOTkxOTksImV4cCI6MTY0NjEwMjc5OX0.IwyEmjnesssRvRNiWgbzckp8ugBgfKfYuxnSs7VjQ84");
        String subject = claims.getSubject();
        System.out.println("result:\n"+subject);
    }

    /**
     * 生成加密后的密钥 secretKey
     * @return
     */
    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }

    /**
     * 解析
     * @param jwt
     * @return
     * @throws Exception
     */
    public static Claims parseJWT(String jwt) throws Exception {
        SecretKey secretKey = generalKey();
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();
    }
}
