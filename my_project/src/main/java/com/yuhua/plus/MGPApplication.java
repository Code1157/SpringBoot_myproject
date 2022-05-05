package com.yuhua.plus;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@MapperScan("com.yuhua.plus.dao")
public class MGPApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext run = SpringApplication.run(MGPApplication.class, args);
        System.out.println("**********************************************");
        System.out.println("**********************************************");
        System.out.println("**********************************************");
        System.out.println(run);
        System.out.println("**********************************************");
        System.out.println("**********************************************");
        System.out.println("**********************************************");
    }

}
