PGDMP                      }            decameron-hotel    16.7    16.7 6    )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ,           1262    25213    decameron-hotel    DATABASE     w   CREATE DATABASE "decameron-hotel" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-ES';
 !   DROP DATABASE "decameron-hotel";
                proot    false            �            1259    28161    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap    proot    false            �            1259    28160    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public          proot    false    221            -           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public          proot    false    220            �            1259    28194    habitaciones    TABLE     �  CREATE TABLE public.habitaciones (
    id bigint NOT NULL,
    hotel_id bigint NOT NULL,
    tipo character varying(255) NOT NULL,
    acomodacion character varying(255) NOT NULL,
    cantidad integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT habitaciones_acomodacion_check CHECK (((acomodacion)::text = ANY ((ARRAY['sencilla'::character varying, 'doble'::character varying, 'triple'::character varying, 'cuádruple'::character varying])::text[]))),
    CONSTRAINT habitaciones_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['estandar'::character varying, 'junior'::character varying, 'suite'::character varying])::text[])))
);
     DROP TABLE public.habitaciones;
       public         heap    proot    false            �            1259    28193    habitaciones_id_seq    SEQUENCE     |   CREATE SEQUENCE public.habitaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.habitaciones_id_seq;
       public          proot    false    227            .           0    0    habitaciones_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.habitaciones_id_seq OWNED BY public.habitaciones.id;
          public          proot    false    226            �            1259    28185    hoteles    TABLE     p  CREATE TABLE public.hoteles (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    direccion character varying(255) NOT NULL,
    ciudad character varying(255) NOT NULL,
    nit character varying(255) NOT NULL,
    numero_habitaciones integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.hoteles;
       public         heap    proot    false            �            1259    28184    hoteles_id_seq    SEQUENCE     w   CREATE SEQUENCE public.hoteles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.hoteles_id_seq;
       public          proot    false    225            /           0    0    hoteles_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.hoteles_id_seq OWNED BY public.hoteles.id;
          public          proot    false    224            �            1259    28137 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    proot    false            �            1259    28136    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          proot    false    216            0           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          proot    false    215            �            1259    28154    password_resets    TABLE     �   CREATE TABLE public.password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);
 #   DROP TABLE public.password_resets;
       public         heap    proot    false            �            1259    28173    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap    proot    false            �            1259    28172    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public          proot    false    223            1           0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public          proot    false    222            �            1259    28144    users    TABLE     x  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.users;
       public         heap    proot    false            �            1259    28143    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          proot    false    218            2           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          proot    false    217            o           2604    28164    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public          proot    false    221    220    221            s           2604    28197    habitaciones id    DEFAULT     r   ALTER TABLE ONLY public.habitaciones ALTER COLUMN id SET DEFAULT nextval('public.habitaciones_id_seq'::regclass);
 >   ALTER TABLE public.habitaciones ALTER COLUMN id DROP DEFAULT;
       public          proot    false    226    227    227            r           2604    28188 
   hoteles id    DEFAULT     h   ALTER TABLE ONLY public.hoteles ALTER COLUMN id SET DEFAULT nextval('public.hoteles_id_seq'::regclass);
 9   ALTER TABLE public.hoteles ALTER COLUMN id DROP DEFAULT;
       public          proot    false    225    224    225            m           2604    28140    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          proot    false    216    215    216            q           2604    28176    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public          proot    false    223    222    223            n           2604    28147    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          proot    false    217    218    218                       0    28161    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public          proot    false    221   pA       &          0    28194    habitaciones 
   TABLE DATA           i   COPY public.habitaciones (id, hotel_id, tipo, acomodacion, cantidad, created_at, updated_at) FROM stdin;
    public          proot    false    227   �A       $          0    28185    hoteles 
   TABLE DATA           r   COPY public.hoteles (id, nombre, direccion, ciudad, nit, numero_habitaciones, created_at, updated_at) FROM stdin;
    public          proot    false    225   �A                 0    28137 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          proot    false    216   HB                 0    28154    password_resets 
   TABLE DATA           C   COPY public.password_resets (email, token, created_at) FROM stdin;
    public          proot    false    219   �B       "          0    28173    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, created_at, updated_at) FROM stdin;
    public          proot    false    223   C                 0    28144    users 
   TABLE DATA           u   COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
    public          proot    false    218   )C       3           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public          proot    false    220            4           0    0    habitaciones_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.habitaciones_id_seq', 1, true);
          public          proot    false    226            5           0    0    hoteles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.hoteles_id_seq', 6, true);
          public          proot    false    224            6           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 6, true);
          public          proot    false    215            7           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);
          public          proot    false    222            8           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          proot    false    217            ~           2606    28169    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public            proot    false    221            �           2606    28171 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public            proot    false    221            �           2606    28203    habitaciones habitaciones_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.habitaciones
    ADD CONSTRAINT habitaciones_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.habitaciones DROP CONSTRAINT habitaciones_pkey;
       public            proot    false    227            �           2606    28192    hoteles hoteles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.hoteles
    ADD CONSTRAINT hoteles_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.hoteles DROP CONSTRAINT hoteles_pkey;
       public            proot    false    225            w           2606    28142    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            proot    false    216            �           2606    28180 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public            proot    false    223            �           2606    28183 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public            proot    false    223            y           2606    28153    users users_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
       public            proot    false    218            {           2606    28151    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            proot    false    218            |           1259    28159    password_resets_email_index    INDEX     X   CREATE INDEX password_resets_email_index ON public.password_resets USING btree (email);
 /   DROP INDEX public.password_resets_email_index;
       public            proot    false    219            �           1259    28181 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public            proot    false    223    223            �           2606    28204 *   habitaciones habitaciones_hotel_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.habitaciones
    ADD CONSTRAINT habitaciones_hotel_id_foreign FOREIGN KEY (hotel_id) REFERENCES public.hoteles(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.habitaciones DROP CONSTRAINT habitaciones_hotel_id_foreign;
       public          proot    false    225    4743    227                   x������ � �      &      x������ � �      $   �   x�m�11����J�6��Vjq9O8]��9�?ޢ f}���`N��K���<��NM��X�=�`YLi��������6�X�Kn;M�DC����1�/B�\r>��Dy�ޗ�p{g�D^��)y��� ��^BZ         �   x�]��� ����0�e�û�4�%� ��w�6{����b�!j�ߐ��Y�$&�<z�P�-�|qJ�'��$��/Ʌ�L��%7v^&z��q���Y9��%afOl��%	O�[9,��r��u-�!��F����R]f�¼�׃R�f�Z?            x������ � �      "      x������ � �            x������ � �     