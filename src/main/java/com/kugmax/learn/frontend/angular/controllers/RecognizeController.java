package com.kugmax.learn.frontend.angular.controllers;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.io.IOUtils;

import java.io.FileOutputStream;
import java.io.InputStream;

@RequestMapping("/v1/recognize")
@RestController
public class RecognizeController {

    @RequestMapping(method = RequestMethod.POST)

    public String recognize(HttpEntity<byte[]> requestEntity) throws Exception {

        System.out.println("in recognize");
        String imageString = IOUtils.toString(requestEntity.getBody(), "UTF-8");

        return "need impl";
    }
}
