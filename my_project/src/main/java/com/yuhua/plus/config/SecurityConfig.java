package com.yuhua.plus.config;

import com.yuhua.plus.filter.JwtAuthenticationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/*
* SpringSecurity配置类
* */
@Configuration
// 开启 全局用户权限校验功能
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;

    // 创建BCryptPasswordEncoder注入容器
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 放行 静态资源
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/css/**")
                .antMatchers("/font/**")
                .antMatchers("/js/**")
                .antMatchers("/images/**")
                .antMatchers("/music/**")
                .antMatchers("/lyrics/**")
                .antMatchers("/pages/index.html")
                .antMatchers("/pages/player.html")
                .antMatchers("/pages/mymusic_unlog.html")
                .antMatchers("/pages/mymusic_music.html")
                .antMatchers("/pages/mymusic_songlist.html")
                .antMatchers("/pages/songlist.html")
                .antMatchers("/pages/songbox_edit.html")
                .antMatchers("/pages/mymusic_upload.html")
                .antMatchers("/pages/manager.html")
                .antMatchers("/pages/login.html")
                .antMatchers("/pages/search.html")
                .antMatchers("/pages/introduction.html")
                .antMatchers("/pages/test/**");
        super.configure(web);
    }

    // 放行api接口
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // 关闭csrf（csrf是跨域策略，但不支持post请求，若使用了RestFul等post方法，须disable关闭这个方法）
                .csrf().disable()
                // 不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // 继续增加其他配置
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问（登录后不能访问）
                .antMatchers("/login").anonymous()
                .antMatchers("/users/register").anonymous()
                .antMatchers("/users/{username}").anonymous()
                // permitAll() 允许登录与非登录状态访问 api接口
                .antMatchers("/users/hello").permitAll()
                .antMatchers("/songs").permitAll()
                .antMatchers("/songs/s/{songname}").permitAll()
                .antMatchers("/songs/songDetail/{id}").permitAll()
                .antMatchers("/songs/releaseSong").permitAll()
                .antMatchers("/songs/uploadSongPlayCount").permitAll()
                .antMatchers("/songs/cache").permitAll()
                .antMatchers("/songbox/recom").permitAll()
                .antMatchers("/songbox/intro/{songboxId}").permitAll()
                .antMatchers("/songbox/list/{songboxId}").permitAll()
                .antMatchers("/songbox/uploadSongBoxPlayCount").permitAll()
                // 除上面外的所有请求全部需要鉴权认证（其他接口登录可用）
                .anyRequest().authenticated();

        // 添加过滤器
        // 把自定义的过滤器 放到UsernamePasswordAuthenticationFilter过滤器之前
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        // 配置异常处理器
        http.exceptionHandling()
                // 配置 授权失败 处理
                .accessDeniedHandler(accessDeniedHandler)
                // 配置 认证失败 处理
                .authenticationEntryPoint(authenticationEntryPoint);

        // 允许跨域  （自动调用CorsConfig配置类）
        http.cors();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
