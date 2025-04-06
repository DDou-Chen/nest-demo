migration:create：生成空白 migration 文件
migration:generate：连接数据库，根据 Entity 和数据库表的差异，生成 migration 文件
migration:run：执行 migration，会根据数据库 migrations 表的记录来确定执行哪个
migration:revert：撤销上次 migration，删掉数据库 migrations 里的上次执行记录
